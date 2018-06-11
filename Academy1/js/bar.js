function drawBarChart(sale) {
    let svg = document.getElementById('svg');
    const axisY = 500, axisX = 500;

    let t = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];
    // let s = [120, 100, 140, 160, 180, 185, 190, 210, 230, 245, 255, 270];
    let s = sale;
    let sMax = Math.max.apply(null, s);  // 取得数组中的最大值

    let ratioY = axisY / sMax;  // 纵轴上，每单位数据的像素数
    let unitY = 50 * ratioY;  // 纵轴上，每刻度数据的像素数（设置每刻度为50单位数据）
    let unitsY = Math.ceil(sMax / 50);  // 纵轴上的刻度数

    let unitX = axisX / 12;  // 横轴上，每刻度的像素数

    // 绘制坐标轴(有效刻度+富余)

    let str_axisX = `<line x1='100' y1='600' x2='680' y2='600' stroke='#000' class='axis' />`;
    let str_axisY = `<line x1='100' y1='600' x2='100' y2='20' stroke='#000' class='axis' />`;

    // 绘制纵轴刻度 + 文字
    let str_scaleY = '';
    let str_textY = '';
    for (let i = 0; i <= unitsY; i++) {
        let y = 600 - unitY * i;
        str_scaleY += `<line x1='100' y1='${y}' x2='95' y2='${y}' stroke='#000' />`;
        str_textY += `<text x='70' y='${y}'>${50 * i}</text>`;
    };
    let strY = str_scaleY + str_textY + str_axisY;

    // 绘制横轴刻度 + 文字
    let str_scaleX = '';
    let str_textX = '';
    for (let i = 0; i < 12; i++) {
        let x = 130 + unitX * i;  // 与折线图不同，左边要留一定间距
        str_scaleX += `<line x1='${x}' y1='600' x2='${x}' y2='605' stroke='#000' />`;
        str_textX += `<text x='${x}' y='620'>${t[i]}</text>`;
    };
    let strX = str_scaleX + str_textX + str_axisX;

    // 绘制基线（与横轴重叠的不绘制）
    let baseLine = '';
    for (let i = 1; i <= unitsY; i++) {
        let y = 600 - unitY * i;
        baseLine += `<line x1='100' y1='${y}' x2='600' y2='${y}' stroke='#ccc' />`;
    };

    // 绘制柱子
    let bar = '';
    for (let i = 0; i < 12; i++) {
        let x = 130 + unitX * i;
        let y = 600 - s[i] * ratioY;
        let h = s[i] * ratioY;
        bar += `<rect x='${x-10}' y='${y}' width='20' height='${h}' />`;
    }

    svg.innerHTML = strY + strX + baseLine + bar;
}