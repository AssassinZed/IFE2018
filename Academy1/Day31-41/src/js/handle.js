/* Data Processing Module */

/* Get selected checkboxes */
// list, a list of checkboxes in its container
function getSelectedCheckbox(list) {
    let arr = [];                              // save data-text value of selected checkboxes 
    for (let i = 1; i < list.length; i++) {    // i = 0 ignored
        if (list[i].checked) {
            arr.push(list[i].dataset.text);
        }
    }
    return arr;
}

/* Filter data */
// arr1, the return value of getSelectedCheckbox(regions); arr2, as well.
function filterData(arr1, arr2) {
    let arr = [];   // save filtered data 
    sourceData.forEach(function (val) {
        if (arr1.includes(val.region) && arr2.includes(val.product)) {
            arr.push(val);
        }
    });
    return arr;
}

/* Actions when click the checkbox */
// list, a list of checkboxes in its container
// 依赖getSelectedCheckbox(), updateAllIfClick() 函数
// This method should be invoked lastly.
function clickOnCheckbox(container, list) {
    container.addEventListener('click', function (e) {      // 事件代理
        if (e.target.tagName.toLowerCase() == 'input') {
            let tar = e.target;
            let len = getSelectedCheckbox(list).length;  // 点击之后已选中checkboxes的数量

            if (tar.dataset.text == '全选') {
                if (len != 3) {
                    for (let i = 1; i < list.length; i++) {
                        list[i].checked = true;
                    }
                }
            } else {
                switch (len) {
                    case 0:
                        tar.checked = true;
                        break;
                    case 3:
                        list[0].checked = true;
                        break;
                    case 2:
                        list[0].checked = false;
                        break;
                }
            }
        };
        updateTable();          // 在点击操作完成后，更新表格
        updateGraph();          // 更新图形
        hoverOnTable();         // 开始监听table
    })
}

/* 依据checkboxes更新表格 */
// 依赖getSelectedCheckbox(), filterData(), tableRender() 函数
function updateTable() {
    let arr1 = getSelectedCheckbox(regions);
    let arr2 = getSelectedCheckbox(products);
    let data = filterData(arr1, arr2);
    tableRender(data);          // 重绘表格
}

/* 依据表格更新图形 */
// 依赖drawBarChart(), drawLineChart() 函数
function updateGraph() {
    let tbody = document.querySelector('tbody');
    let trList = tbody.querySelectorAll('tr');
    let data_total = [];    // 存储表格中的所有销量数据
    for (let i = 0; i < trList.length; i++) {
        let tdList = trList[i].querySelectorAll('td');
        let data_row = [];  // 存储每行的销量数据
        for (let j = 0; j < tdList.length; j++) {
            if (tdList[j].children.length) {
                let para = tdList[j].querySelector('p');
                data_row.push(Number(para.textContent));
            }
        }
        let obj = { product: '手机', region: '华东', sale: data_row }; // 仅sale属性有效，其余属性可任意设置
        data_total.push(obj);
    }
    drawBarChart(data_total);
    drawLineChart(data_total);
}

/* Actions when hover the table  */
// This method should be invoked lastly.
// 依赖drawBarChart(), drawLineChart(), hoverOnCell(), updateGraph() 函数
function hoverOnTable() {
    let tbody = document.querySelector('tbody');
    tbody.addEventListener('mouseover', function (e) {     // 事件代理
        if (e.target.tagName.toLowerCase() == 'td' && e.target.children.length) {       // 除去不含商品销量数据的单元格

            let tar = e.target;
            let tr = tar.parentNode;
            let tdList = tr.childNodes;
            let arr = [];
            for (let i = tdList.length === 14 ? 2 : 1; i < tdList.length; i++) {        // i初始值为1还是2，取决于mouseover所在行的td数目
                let para = tdList[i].querySelector('p');
                arr.push(Number(para.textContent));  // 将td中的内容转换为数字后存入数组
            };
            let arr_data = [{ product: '手机', region: '华北', sale: arr }];            // 仅sale属性是有效，其他可任意设置
            drawBarChart(arr_data);     // 绘制hover时的图形
            drawLineChart(arr_data);
            hoverOnCell(tar);           // 监听tabel cell上的行为
        };
        tbody.onmouseleave = updateGraph;       // 鼠标离开之后更新图形
    })
}

/* Actions when hover the table cell */
// tar, the table cell which triggers the event 
function hoverOnCell(tar) {
    let para = tar.querySelector('p');
    let span = tar.querySelector('span');
    let div_inner = tar.querySelector('.multi');
    let input = tar.querySelector('input');
    let aList = tar.querySelectorAll('a');
    let a1 = aList[0];
    let a2 = aList[1];

    // 编辑按钮绑定点击事件
    span.style.display = 'block';
    span.onclick = function () {
        span.style.display = 'none';
        div_inner.style.display = 'block';
    }

    // 确认按钮绑定点击事件
    a1.onclick = function () {
        let val = input.value;
        if (!Number(val) && val !== '0') {
            alert('请输入正确数值！');
            input.value = null;         // 清空不正确的输入        
            div_inner.style.display = 'none';
        } else {
            para.textContent = input.value;
            updateGraph();
            div_inner.style.display = 'none';
        }
    }

    // 取消按钮绑定点击事件
    a2.onclick = function () {
        div_inner.style.display = 'none';
    }

    // 活动单元格绑定鼠标离开事件
    tar.onmouseleave = function () {
        div_inner.style.display = 'none';
        span.style.display = 'none';
    }
}