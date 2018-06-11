function drawLineChart(sale) {
    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');
    canvas.height = 700;
    canvas.width = 700;
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

    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#000';

    ctx.moveTo(100, 20);  // 富余Y=80
    ctx.lineTo(100, 100);

    ctx.moveTo(100, 100);
    ctx.lineTo(100, 100 + axisY);
    ctx.lineTo(600, 100 + axisY);
    
    ctx.moveTo(600, 100 + axisY);  // 富余X=80
    ctx.lineTo(680, 100 + axisY);

    ctx.stroke();

    // 绘制纵轴刻度 + 文字
    for (let i = 0; i <= unitsY; i++) {
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.moveTo(100, 600 - unitY * i);
        ctx.lineTo(95, 600 - unitY * i);
        ctx.stroke();

        ctx.fillText(`${50 * i}`, 70, 600 - unitY * i);
    }

    // 绘制横轴刻度 + 文字
    for (let i = 0; i < 12; i++) {
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.moveTo(100 + unitX * i, 600);
        ctx.lineTo(100 + unitX * i, 605);
        ctx.stroke();

        ctx.fillText(t[i], 100 + unitX * i, 620, 20);
    }

    // 绘制基线（与横轴重叠的不绘制）
    for (let i = 1; i <= unitsY; i++) {
        ctx.beginPath();
        ctx.moveTo(100, 600 - unitY * i);
        ctx.lineTo(600, 600 - unitY * i);
        ctx.lineWidth = 1;
        ctx.strokeStyle = '#ccc';
        ctx.stroke();
    }

    // 绘制数据点
    for (let i = 0; i < 12; i++) {
        if (i == 0) {
            ctx.beginPath();
            ctx.arc(100 + 40 * i, 600 - s[0] * ratioY, 2.5, 0, 2 * Math.PI);
            ctx.fillStyle = '#000';
            ctx.fill();
        } else {
            ctx.beginPath();
            ctx.arc(100 + 40 * i, 600 - s[i] * ratioY, 2.5, 0, 2 * Math.PI);
            ctx.moveTo(100 + 40 * (i - 1), 600 - s[i - 1] * ratioY);
            ctx.lineTo(100 + 40 * i, 600 - s[i] * ratioY);
            ctx.fillStyle = '#000';
            ctx.lineWidth = 1;
            ctx.strokeStyle = '#000';
            ctx.fill();
            ctx.stroke();
        }
    }
}