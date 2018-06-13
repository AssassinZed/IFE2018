
// 绘制柱状图，参数data来自于invokeFn()的返回值，支持多数据

function drawBarChart(data) {

    // 每次调用需将原图清除
    let svg = document.getElementById('svg');
    svg.innerHTML = '';

    // 获取data中所有销量的最大值
    let arr = [];
    for (let i = 0; i < data.length; i++) {
        let per_max = Math.max.apply(null, data[i].sale);
        arr.push(per_max);
    };
    let all_max = Math.max.apply(null, arr);

    let t = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
    const axisY = 300;  // 代表Y轴的有效长度，不包含富余，下同
    const axisX = 600;

    let numY = 6;                       // 纵轴均分为6段
    let unitY_px = axisY / numY;        // 纵轴上，每段的像素长度(50px)
    let unitY_data = all_max / numY;    // 纵轴上，每段的数据长度
    let ratioY = axisY / all_max;       // 纵轴上，每单位数据的像素数

    let numX = 12;                      // 横轴均分为12段
    let unitX_px = axisX / numX;        // 横轴上，每刻度的像素长度(50px)

    // 绘制坐标轴：有效刻度 + 富余50

    let str_axisY = `<line x1='50' y1='350' x2='50' y2='50' stroke='#000' />`;
    let str_axisX = `<line x1='50' y1='350' x2='650' y2='350' stroke='#000' />`;

    // 绘制纵轴刻度 + 文字
    let str_scaleY = '';        // 将Y轴上的刻度，存储在一个字符串中
    let str_textY = '';         // 将Y轴上的文字，存储在一个字符串中
    for (let i = 1; i <= numY; i++) {
        let y = 350 - unitY_px * i;            // 每个Y轴刻度的纵坐标
        let tY = Math.round(unitY_data * i);   // 每个Y轴数字的值（取整）
        str_scaleY += `<line x1='50' y1='${y}' x2='45' y2='${y}' stroke='#000' />`;
        str_textY += `<text x='20' y='${y + 3}'>${tY}</text>`;    //  y+3：文字中心与刻度对齐
    };
    let strY = str_scaleY + str_textY + str_axisY;

    // 绘制横轴刻度 + 文字
    let str_scaleX = '';
    let str_textX = '';
    for (let i = 0; i < 12; i++) {
        let x = 50 + unitX_px * i;        // 每个X轴刻度的横坐标
        str_scaleX += `<line x1='${x}' y1='350' x2='${x}' y2='345' stroke='#000' />`;
        str_textX += `<text x='${x + 16}' y='370'>${t[i]}</text>`;    // x+16：文字中心与每段中心对齐
    };
    let strX = str_scaleX + str_textX + str_axisX;

    // 绘制基线（与绘制纵轴刻度类似）
    let str_baseLine = '';
    for (let i = 1; i <= numY; i++) {
        let y = 350 - unitY_px * i;
        str_baseLine += `<line x1='50' y1='${y}' x2='650' y2='${y}' stroke='#ccc' />`;
    };

    // 绘制柱子

    let color = ["#60acfc", "#32d3eb", "#5bc49f", "#feb64d", "#ff7c7c", "#9287e7", "#60acfc", "#32d3eb", "#5bc49f"];  // 为各个柱子填充不同的颜色
    let len = data.length;
    let str_bar = '';
    let w = unitX_px / (len + 2);         // 柱子的宽度 = unitX_px / (柱子总数 + 2)
    for (let i = 0; i < len; i++) {

        let sale = data[i].sale;

        for (let j = 0; j < 12; j++) {
            let x = 50 + unitX_px * j + w * i + w;              // 最后再加一个w：与每段中心对齐
            let h = sale[j] * ratioY;                           // 每个柱子的像素高度
            let y = 350 - h;                                    // 每个柱子左上角的纵坐标
            str_bar += `<rect x='${x}' y='${y}' width='${w}' height='${h}' fill='${color[i]}' />`;
        }
    }

    // 渲染所有图形元素
    svg.innerHTML = strY + strX + str_baseLine + str_bar;
}