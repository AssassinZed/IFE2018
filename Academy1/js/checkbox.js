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

// 设置checkbox上的点击行为
function clickOnCheeckbox(list) {

    for (let i = 1; i < list.length; i++) {
        list[i].onclick = function (e) {
            let arr = getSelectedCheckbox(list);

            // 点击之后若arr长度为0，则阻止点击事件
            if (arr.length == 0) {
                e.preventDefault();
            }

            // 点击之后若arr长度为3，则更改lists[0]的状态
            if (arr.length == 3) {
                list[0].checked = true;
            } else {
                list[0].checked = false;
            }

            tableRender(invokeFn()); // list[i]调用
        }
    }

    if (getSelectedCheckbox(list).length != 3) {
        list[0].onclick = function () {
            for (let i = 1; i < list.length; i++) {
                list[i].checked = true;
            }
            tableRender(invokeFn()); // list[0]调用
        }
    }
}