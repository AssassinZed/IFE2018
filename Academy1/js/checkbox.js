/* checkbox模块 */

// 生成checkbox函数
function createCheckboxes(container, props) {
    let str1 = `<input type='checkbox' data-text='全选'>全选</input>`;
    let str2 = ``;
    for (let i = 0; i < 3; i++) {
        str2 += `<input type='checkbox' id='${props[i].id}' value='${props[i].value}' data-text='${props[i].text}'>${props[i].text}`;
    }
    container.innerHTML = str1 + str2;
}
