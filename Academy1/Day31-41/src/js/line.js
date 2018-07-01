
// 绘制折线图，参数data来自于invokeFn()的返回值，支持多数据

function drawLineChart(data) {

    // 每次调用要先清空原图，重置画布
    let line_wrappper = document.getElementById('line-wrapper');
    line_wrappper.innerHTML = '';
    line_wrappper.innerHTML = `<canvas id="canvas" width="700" height="400"></canvas>`;

    // 获取data中所有销量的最大值
    let arr = [];
    for (let i = 0; i < data.length; i++) {
        let per_max = Math.max.apply(null, data[i].sale);
        arr.push(per_max);
    };
    let all_max = Math.max.apply(null, arr);

    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');

    let t = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
    const axisY = 300;  // 代表Y轴的有效长度，不包含富余，下同
    const axisX = 600;

    let numY = 6;                           // 纵轴均分为6段
    let unitY_px = axisY / numY;            // 纵轴上，每段的像素长度(50px)
    let unitY_data = all_max / numY;        // 纵轴上，每段的数据长度
    let ratioY = axisY / all_max;           // 纵轴上，每单位数据的像素数

    let numX = 12;                          // 横轴均分为12段
    let unitX_px = axisX / numX;            // 横轴上，每刻度的像素长度(50px)

    // 绘制坐标轴：有效刻度 + 富余50
    ctx.beginPath();
    ctx.moveTo(50.5, 50.5);
    ctx.lineTo(50.5, 50.5 + axisY);
    ctx.lineTo(650.5, 50.5 + axisY);
    ctx.stroke();

    // 绘制纵轴刻度 + 文字
    for (let i = 1; i <= numY; i++) {
        let y = 350.5 - unitY_px * i;          // 每个Y轴刻度的纵坐标
        let tY = Math.round(unitY_data * i);   // 每个Y轴数字的值（取整）     
        // 刻度
        ctx.beginPath();
        ctx.moveTo(50.5, y);
        ctx.lineTo(45.5, y);
        ctx.stroke();
        // 文字
        ctx.fillText(`${tY}`, 20, y + 3);    //  y+3：文字中心与刻度对齐
    }

    // 绘制横轴刻度 + 文字
    for (let i = 0; i < 12; i++) {
        let x = 50.5 + unitX_px * i;        // 每个X轴刻度的横坐标
        // 刻度
        ctx.beginPath();
        ctx.moveTo(x, 350.5);
        ctx.lineTo(x, 345.5);
        ctx.stroke();
        // 文字
        ctx.fillText(t[i], x - 10, 370);       // x-10：文字中心与刻度对齐
    }

    // 绘制基线（与横轴重叠的不绘制）
    for (let i = 1; i <= numY; i++) {
        let y = 350.5 - unitY_px * i;
        ctx.beginPath();
        ctx.moveTo(50.5, y);
        ctx.lineTo(650.5, y);
        ctx.strokeStyle = '#ccc';
        ctx.stroke();
    }

    // 绘制数据点
    let color = ["#60acfc", "#32d3eb", "#5bc49f", "#feb64d", "#ff7c7c", "#9287e7", "#60acfc", "#32d3eb", "#5bc49f"];  // 为各个数据点、线条填充不同的颜色
    for (let i = 0; i < data.length; i++) {

        let sale = data[i].sale;

        for (let j = 0; j < 12; j++) {
            let x = 50.5 + unitX_px * j;                    // 每个数据点的横坐标
            let y = 350.5 - sale[j] * ratioY;               // 每个数据点的纵坐标

            if (j == 0) {       // i为0时，无需绘制线条
                ctx.beginPath();
                ctx.arc(x, y, 4, 0, 2 * Math.PI);
                ctx.fillStyle = `${color[i]}`;
                ctx.fill();
            } else {
                let x_pre = 50.5 + unitX_px * (j - 1);      // 上个数据点的横坐标
                let y_pre = 350.5 - sale[j - 1] * ratioY;   // 上个数据点的纵坐标
                ctx.beginPath();
                ctx.arc(x, y, 4, 0, 2 * Math.PI);
                ctx.moveTo(x, y);
                ctx.lineTo(x_pre, y_pre);
                ctx.fillStyle = `${color[i]}`;
                ctx.strokeStyle = `${color[i]}`;
                ctx.fill();
                ctx.stroke();
            }
        }
    }
}
