/* 表格模块 */


// 渲染表格
function tableRender(data) {

    // 获取两组checkbox的选择数量
    let len1 = getSelectedCheckbox(regions).length;
    let len2 = getSelectedCheckbox(products).length;

    if ((len1 > 1 && len2 == 1) || (len1 > 1 && len2 > 1) || (len1 == 1 && len2 == 1)) {

        table_wrapper.innerHTML = `<table><thead><tr><th>商品</th><th>地区</th><th>1月</th><th>2月</th><th>3月</th><th>4月</th><th>5月</th><th>6月</th><th>7月</th><th>8月</th><th>9月</th><th>10月</th><th>11月</th><th>12月</th></tr></thead><tbody></tbody></table>`;
        let tbody = document.querySelector('table').tBodies[0];

        for (let i = 0; i < data.length; i++) {
            if (i % len1 === 0) {              //  在i等于len1整数倍处，为需要设置rowspan属性的td
                tbody.innerHTML += `<tr><td rowspan='${len1}'>${data[i].product}</td><td>${data[i].region}</td></tr>`;    //  这些行多一个td元素
            } else {
                tbody.innerHTML += `<tr><td>${data[i].region}</td></tr>`;    //  其余行少一个td元素
            }

            let tr = tbody.getElementsByTagName('tr')[i];    //  获取tbody中的第i个<tr>

            // 每一行所有销量的数据
            let s = data[i].sale;

            // 将所有销量数据渲染到tr中
            for (let j = 0; j < s.length; j++) {
                tr.innerHTML += `<td><div><p>${s[j]}</p><div style='display: none' class='multi'><input type="text"><a class="yes">确认</a><a class="no">取消</a></div><span class="edit" style='display: none'>编辑</span></div></td>`;
            }
        }
    }

    if (len1 == 1 && len2 > 1) {

        table_wrapper.innerHTML = `<table><thead><tr><th>地区</th><th>商品</th><th>1月</th><th>2月</th><th>3月</th><th>4月</th><th>5月</th><th>6月</th><th>7月</th><th>8月</th><th>9月</th><th>10月</th><th>11月</th><th>12月</th></tr></thead><tbody></tbody></table>`;
        let tbody = document.querySelector('table').tBodies[0];

        for (let i = 0; i < data.length; i++) {
            if (i === 0) {
                tbody.innerHTML += `<tr><td rowspan='${len2}'>${data[i].region}</td><td>${data[i].product}</td></tr>`;    //  第一行多一个td元素
            } else {
                tbody.innerHTML += `<tr><td>${data[i].product}</td></tr>`;    //  其余行少一个td元素
            }

            let tr = tbody.getElementsByTagName('tr')[i];    //  获取tbody中的第i个<tr>

            // 每一行所有销量的数据
            let s = data[i].sale;

            // 将所有销量数据渲染到tr中
            for (let j = 0; j < s.length; j++) {
                tr.innerHTML += `<td><div><p>${s[j]}</p><div style='display: none' class='multi'><input type="text"><a class="yes">确认</a><a class="no">取消</a></div><span class="edit" style='display: none'>编辑</span></div></td>`;
            }
        }
    }
}