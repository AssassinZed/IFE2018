/* Checkbox Module */

/* Render checkbox */
// value, text, both Array type
function createCheckboxes(container, value, text) {
    let str1 = `<input type='checkbox' data-text='全选'><span>全选</span>`;
    let str2 = ``;
    for (let i = 0; i < 3; i++) {
        str2 += `<input type='checkbox' id='${value[i]}' value='${value[i]}' data-text='${text[i]}'><span>${text[i]}</span>`;
    }
    container.innerHTML = str1 + str2;
}