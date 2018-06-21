/* 主模块 */

// 元素命名
let div_region = document.getElementById('region-radio-wrapper');
let div_product = document.getElementById('product-radio-wrapper');
let table_wrapper = document.getElementById('table-wrapper');
let btn_save = document.getElementById('save');

// 一、调用以生成checkboxes
createCheckboxes(div_region, [{
    id: 'north',
    value: 'north',
    text: '华北'
}, {
    id: 'south',
    value: 'south',
    text: '华南'
}, {
    id: 'east',
    value: 'east',
    text: '华东'
}]);

createCheckboxes(div_product, [{
    id: 'mobile',
    value: 'mobile',
    text: '手机'
}, {
    id: 'laptop',
    value: 'laptop',
    text: '笔记本'
}, {
    id: 'speaker',
    value: 'speaker',
    text: '智能音箱'
}]);

let regions = div_region.getElementsByTagName('input');
let products = div_product.getElementsByTagName('input');

// 设置初始状态
regions[1].checked = true;
products[1].checked = true;

// 二、调用以生成table
tableRender(invokeFn());

// // 三、调用以生成：初始柱状图与折线图
let data1 = [{
    product: "手机",
    region: "华北",
    sale: [80, 70, 90, 110, 130, 145, 150, 160, 170, 185, 190, 200]
}]
drawBarChart(data1);
drawLineChart(data1);

// 四、调用以监听checkboxes上的点击行为
clickOnCheeckbox(regions);
clickOnCheeckbox(products);


// 五、监听每个td上的mouseover事件

let tdList = document.querySelectorAll('td');
let str_input = `<input type='text'><button>确认</button><button>取消</button>`;
let str_edit = `<span>编辑</span>`;
for (let i = 0; i < tdList.length; i++) {
    tdList[i].onmouseenter = function () {
        let count = 0;
        let origin_data = tdList[i].textContent;    // 存储单元格中的原始内容

        tdList[i].innerHTML += str_edit;

        tdList[i].onclick = function (e) {
            let tag = e.target.tagName.toLowerCase();
            // 单元格在 mouseenter 之后的 onclick 仅触发一次相关事件
            if (tag != 'span' && count < 1) {
                tdList[i].innerHTML = origin_data + str_input;
                count++;
            };

            let input = tdList[i].querySelector('input');
            let btnList = tdList[i].querySelectorAll('button');
            btnList[0].onclick = function () {
                let val = input.value;
                if (!Number(val) && val !== '0') {
                    alert('请输入正确数值！');
                } else {
                    tdList[i].innerHTML = input.value;
                }
            };
            btnList[1].onclick = function () {
                tdList[i].innerHTML = origin_data;
            };

        };

        tdList[i].onmouseleave = function () {
            tdList[i].innerHTML = origin_data;
        };
    }

}

btn_save.onclick = function () {
    
}