/* 数据处理模块 */

// 获取selected checkbox
function getSelectedCheckbox(lists) {
    let arr = [];
    for (let i = 1; i < lists.length; i++) {
        if (lists[i].checked) {
            arr.push(lists[i]);
        }
    }
    return arr;
}

// 根据selected checkbox获取数据
function getData(arr) {
    let data = [];
    arr.forEach(function (val) {
        for (let i = 0; i < sourceData.length; i++) {
            if (sourceData[i].region == val.dataset.text || sourceData[i].product == val.dataset.text) {
                data.push(sourceData[i])
            }
        }
    });
    return data;
}

// 筛选数据
function filterData(data1, data2) {
    let arr = [];
    for (let i = 0; i < sourceData.length; i++) {
        if (data1.includes(sourceData[i]) && data2.includes(sourceData[i])) {
            arr.push(sourceData[i]);
        }
    }
    return arr;
}

// 调用函数
function invokeFn() {
    let arr1 = getSelectedCheckbox(regions);
    let arr2 = getSelectedCheckbox(products);
    let data1 = getData(arr1);
    let data2 = getData(arr2);
    let finalData = filterData(data1, data2);
    return finalData;
}