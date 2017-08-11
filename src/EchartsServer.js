/**
 * Created by dx.yang on 2017/8/11.
 */

const uuidV4 = require('uuid/v4');
const template = require('./template');
const http = require('http');
const opn = require('opn');
const fs = require('fs');
const path = require('path');

let echartsJSPath = path.join(__dirname, './echarts.min.js')

const echartsJS = fs.readFileSync(echartsJSPath);


const defaultConfig = {
    host: 'localhost',
    port: '3921',
    app: null
};
class EchartServer {
    constructor(cfg) {
        this.config = Object.assign({}, defaultConfig, cfg);
        this._charts = {};
    }
    add(params) {
        let id = params.id || uuidV4();
        params.width = params.width || 800;
        params.height = params.height || 600;
        params.option = JSON.stringify(params.option, null, 4);
        this._charts[id] = params;
    }
    remove(id) {
        delete this._charts[id];
    }
    show() {
        let partials = [];
        Object.keys(this._charts).forEach(key => {
            let item = this._charts[key];
            let partial = `
                <div id="${item.id}" style="width:${item.width}px; height:${item.height}px;">
                </div>
                <script>
                (function() {
                    var C = echarts.init(document.getElementById('${item.id}'));
                    C.setOption(${item.option})
                })();
                </script>
            `;
            partials.push(partial);
        });
        let htmlContent = template(partials.join('\n'));
        const server = http.createServer((req, res) => {
            if (req.url === '/echarts.js') {
                res.writeHead(200, { 'Content-Type': 'application/javascript' });
                res.end(echartsJS);
                return;
            }
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(htmlContent);
        });
        server.listen(this.config.port, this.config.host);
        let opnParams = [`http://${this.config.host}:${this.config.port}/`];
        if (this.config.app) {
            opnParams.push({
                app: this.config.app
            });
        }
        opn.apply(opn, opnParams)
    }
}

module.exports = EchartServer;