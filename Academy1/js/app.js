/* 主模块 */

let sourceData = [{
    product: "手机",
    region: "华东",
    sale: [120, 100, 140, 160, 180, 185, 190, 210, 230, 245, 255, 270]
}, {
    product: "手机",
    region: "华北",
    sale: [80, 70, 90, 110, 130, 145, 150, 160, 170, 185, 190, 200]
}, {
    product: "手机",
    region: "华南",
    sale: [220, 200, 240, 250, 260, 270, 280, 295, 310, 335, 355, 380]
}, {
    product: "笔记本",
    region: "华东",
    sale: [50, 60, 80, 110, 30, 20, 70, 30, 420, 30, 20, 20]
}, {
    product: "笔记本",
    region: "华北",
    sale: [30, 35, 50, 70, 20, 15, 30, 50, 710, 130, 20, 20]
}, {
    product: "笔记本",
    region: "华南",
    sale: [80, 120, 130, 140, 70, 75, 120, 90, 550, 120, 110, 100]
}, {
    product: "智能音箱",
    region: "华东",
    sale: [10, 30, 4, 5, 6, 5, 4, 5, 6, 5, 5, 25]
}, {
    product: "智能音箱",
    region: "华北",
    sale: [15, 50, 15, 15, 12, 11, 11, 12, 12, 14, 12, 40]
}, {
    product: "智能音箱",
    region: "华南",
    sale: [10, 40, 10, 6, 5, 6, 8, 6, 6, 6, 7, 26]
}];

// 元素命名
let div_region = document.getElementById('region-radio-wrapper');
let div_product = document.getElementById('product-radio-wrapper');
let table_wrapper = document.getElementById('table-wrapper');

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
tableRender(invokeFn());

// 调用click..()函数
clickOnCheeckbox(regions);
clickOnCheeckbox(products);

// let tbody = document.getElementsByTagName('table')[0].tBodies[0];

// tbody.onmouseover = function (e) {
//     let tr = e.target.parentNode;
//     let tdList = tr.childNodes;
//     let arr = [];
//     for (let i = 2; i < tdList.length; i++) {
//         arr.push(Number(tdList[i].textContent));  // 将td中的内容转换为数字后存入数组
//     };
//     console.log(arr);
//     // drawBarChart(arr);
//     // drawLineChart(arr);
// }

// function showGraph() {

// }

