echarts-server
===
服务端生成echarts图表，可自动启动一个http server，将图表输出到浏览器中显示，便于数据分析工作。

[![NPM](https://nodei.co/npm/echarts-server.png)](https://www.npmjs.com/package/echarts-server)


![](./screenshots/demo1.gif)

## Install
```
npm install echarts-server
```


## Example
```js
const Es = require('echarts-server');

const es = new Es();

es.add({
    id: 'chart0',
    width: 640, // default is 800
    height: 480, // default is 600
    // echarts option
    option: {
        title: {
            text: '堆叠区域图'
        },
        tooltip : {
            trigger: 'axis',
        },
        legend: {
            data:['邮件营销','联盟广告','视频广告','直接访问','搜索引擎']
        },
        xAxis : [
            {
                type : 'category',
                boundaryGap : false,
                data : ['周一','周二','周三','周四','周五','周六','周日']
            }
        ],
        yAxis : [
            {
                type : 'value'
            }
        ],
        series : [
            {
                name:'邮件营销',
                type:'line',
                stack: '总量',
                areaStyle: {normal: {}},
                data:[120, 132, 101, 134, 90, 230, 210]
            },
            {
                name:'联盟广告',
                type:'line',
                stack: '总量',
                areaStyle: {normal: {}},
                data:[220, 182, 191, 234, 290, 330, 310]
            },
            {
                name:'视频广告',
                type:'line',
                stack: '总量',
                areaStyle: {normal: {}},
                data:[150, 232, 201, 154, 190, 330, 410]
            },
            {
                name:'直接访问',
                type:'line',
                stack: '总量',
                areaStyle: {normal: {}},
                data:[320, 332, 301, 334, 390, 330, 320]
            },
            {
                name:'搜索引擎',
                type:'line',
                stack: '总量',
                areaStyle: {normal: {}},
                data:[820, 932, 901, 934, 1290, 1330, 1320]
            }
        ]
    }
});

// open browser
es.show();
```