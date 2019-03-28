const http = require('http');
const fs = require('fs');

let qs = require('querystring');

/*var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "test"
});*/

http.createServer((req,res) => {
    let file;
    switch(req.url) {
        case '/':
            res.writeHead(200, {'Content-Type': 'text/html'});
            file = fs.readFileSync('./index.html');
            res.end(file);
            break;
        case '/WelcomePage.html':
            if (req.method == 'POST') {
                let body = '';
                req.on('data', function (data) {
                    body += data;
                    if (body > 1e6) req.connection.destroy();
                });
                req.on('end', function () {
                    let post = qs.parse(body);
                    console.log(post['login']);
                })
            }
            ;
            res.writeHead(200, {'Content-Type': 'text/html'});
            file = fs.readFileSync('./WelcomePage.html');

            res.end(file);
            break;
    }
}).listen(80, ()=> console.log('Waiting for new users(='));