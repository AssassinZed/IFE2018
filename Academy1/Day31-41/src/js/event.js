
/* 设置checkbox上的点击行为，应最后调用 */
function clickOnCheeckbox(list) {

    for (let i = 1; i < list.length; i++) {
        list[i].onclick = function (e) {
            let arr = getSelectedCheckbox(list);

            // 点击之后若arr长度为0，则立即将其变为选中状态
            if (arr.length == 0) {
                // e.preventDefault();
                list[i].checked = true;
            }

            // 点击之后若arr长度为3，则更改lists[0]的状态
            if (arr.length == 3) {
                list[0].checked = true;
            } else {
                list[0].checked = false;
            }

            let data = invokeFn();        // 每次点击都应获取data
            tableRender(data);            // 每次点击都应重新绘制表格

            // 每次点击都应重新绘制柱状图与折线图
            drawBarChart(data);
            drawLineChart(data);

            // 每次点击都应调用up..()，以便mouseover时更新柱状图与折线图 
            updateGraphIfHover();
        }
    }

    // checkbox未全选时，点击全选按钮进行如下操作
    if (getSelectedCheckbox(list).length != 3) {
        list[0].onclick = function () {
            for (let i = 1; i < list.length; i++) {
                list[i].checked = true;
            }

            let data = invokeFn();
            tableRender(data);

            // 每次点击都应重新绘制柱状图与折线图
            drawBarChart(data);
            drawLineChart(data);

            updateGraphIfHover();
        }
    }
}

// 当mouseover时，绘制mouseover对应的的柱状图与折线图，鼠标离开后恢复
function updateGraphIfHover() {
    let tbody = document.querySelector('tbody');
    tbody.onmouseover = function (e) {
        let tar = e.target;
        if (tar.nodeName.toLowerCase() === 'td') {
            let tr = tar.parentNode;
            let tdList = tr.childNodes;
            let arr = [];
            for (let i = tdList.length === 14 ? 2 : 1; i < tdList.length; i++) {    // i初始值为1还是2，取决于mouseover所在行的td数目
                arr.push(Number(tdList[i].textContent));  // 将td中的内容转换为数字后存入数组
            };

            // 生成柱状图与折线图
            let arr_data = [{
                product: '手机',
                region: '华东',
                sale: arr           // 仅该属性是有用的，其他两个属性无用，可任意设置不影响结果
            }];
            drawBarChart(arr_data);
            drawLineChart(arr_data);
        };
        tbody.onmouseleave = resetGraph;        // 鼠标离开之后重置为初始图形
    }
}

// 当mouseleave时，恢复选中checkboxes对应的柱状图与折线图
function resetGraph() {
    let data = invokeFn();
    drawBarChart(data);
    drawLineChart(data);
}