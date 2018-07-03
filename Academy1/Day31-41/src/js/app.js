/* initialization */

// define some variables
let div_region = document.getElementById('region-wrapper');
let div_product = document.getElementById('product-wrapper');
let table_wrapper = document.getElementById('table-wrapper');
let btn_save = document.getElementById('save');

// Render checkboxes
let value1 = ['north', 'south', 'east'];
let value2 = ['mobile', 'laptop', 'speaker'];
let text1 = ['华北', '华南', '华东'];
let text2 = ['手机', '笔记本', '智能音箱'];
createCheckboxes(div_region, value1, text1);
createCheckboxes(div_product, value2, text2);

// initial status of checkboxes
let regions = div_region.querySelectorAll('input');
let products = div_product.querySelectorAll('input');
regions[1].checked = true;
products[1].checked = true;

// let arr1 = getSelectedCheckbox(regions);
// let arr2 = getSelectedCheckbox(products);
// console.log(filterData(arr1, arr2));

// initial table, barchart, linechart
let initial_data = [{
    product: '手机',
    region: '华北',
    sale: [80, 70, 90, 110, 130, 145, 150, 160, 170, 185, 190, 200]
}];
tableRender(initial_data);
drawBarChart(initial_data);
drawLineChart(initial_data);

// listen checkboxes
clickOnCheckbox(div_region, regions);
clickOnCheckbox(div_product, products);

// listen initial table cell, initial table not needed
let tbody = document.querySelector('tbody');
tbody.addEventListener('mouseover', function (e) {
    if (e.target.tagName.toLowerCase() == 'td' && e.target.children.length) {
        let tar = e.target;
        hoverOnCell(tar);
    }
})