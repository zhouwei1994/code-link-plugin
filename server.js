const http = require('http');
var urlParse = require('url');
var querystring = require('querystring');
const child_process = require('child_process')
http.createServer(function (request, response) {
    // 发送 HTTP 头部
    // HTTP 状态值: 200 : OK
    // 内容类型: text/plain
    response.writeHead(200, 'ok',{
        "Access-Control-Allow-Origin": "*",
        'Content-Type':'application/json; charset = utf8'
    });
    let body = "";
    request.on('data', function (chunk) {
        body += chunk;
    });
    request.on('end', function () {
        // 解析参数
        body = querystring.parse(body);
        const requestData = urlParse.parse(request.url, true)
        if(requestData.pathname == '/code-link'){
            if(body.filePath){
                // 执行vscode定位代码行命令
                if(body.type == 'vsCode'){
                    child_process.exec(`code -r -g ${body.filePath}`)
                    console.log(`code -r -g ${body.filePath}`);
                } else if(body.type == 'webStorm'){
                    let index = body.filePath.lastIndexOf(':');
                    const filePath = body.filePath.substring(0, index)
                    child_process.exec(`webstorm64 ${filePath}`)
                    console.log(`webstorm64 ${filePath}`);
                }
                response.end('打开地址：' + body.filePath);
            } else {
                response.end('【filePath】参数没有传递');
            }
        }
    });
    // response.end();
    // 发送响应数据 "Hello World"

}).listen(1234);

// 终端打印如下信息
console.log('Server running at http://127.0.0.1:1234/');
