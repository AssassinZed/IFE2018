/* 表格模块 */


// 渲染表格
function tableRender(data) {
    table_wrapper.innerHTML = `<table><thead><tr><th>商品</th><th>地区</th><th>1月</th><th>2月</th><th>3月</th><th>4月</th><th>5月</th><th>6月</th><th>7月</th><th>8月</th><th>9月</th><th>10月</th><th>11月</th><th>12月</th></tr></thead><tbody></tbody></table>`;
    let tbody = document.querySelector('table').tBodies[0];

    for (let i = 0; i < data.length; i++) {

        let s = data[i].sale;
        tbody.innerHTML += `<tr></tr>`;

        let tr = tbody.getElementsByTagName('tr')[i];    //  获取tbody中的第i个<tr>
        let tr_data = [data[i].product, data[i].region, s[0], s[1], s[2], s[3], s[4], s[5], s[6], s[7], s[8], s[9], s[10], s[11]];

        // 遍历 tr_data 中的内容，渲染到tr中
        for (let j = 0; j < tr_data.length; j++) {
            tr.innerHTML += `<td>${tr_data[j]}</td>`;
        }
    }
}