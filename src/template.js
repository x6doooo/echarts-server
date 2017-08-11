module.exports = function(body) {
    return `<!DOCTYPE html>
    <html lang="en">
        <head>
        <meta charset="UTF-8">
        <title>Echarts Server</title>
        <script src="/echarts.js"></script>
    </head>
    <body>
        ${body}
    </body>
    </html>`;
};

