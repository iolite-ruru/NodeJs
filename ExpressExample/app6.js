var express = require('express');
var http = require('http');

var app = express();

//첫번째 미들웨어에서 다음 미들웨어로 넘김
app.use(function(req, res, next){
   console.log('첫 번째 미들웨어에서 요청을 처리함.');
   
   var userAgent = req.header('User-Agent');
   var paramName = req.query.name;
   var accept = req.accept; //*****
   res.writeHead('200', {'Content-Type':'text/html; charset=utf8'});
   res.write('<h1>Express 서버에서 응답한 결과입니다.</h1>');
   res.write('<div><p>Accept : '+ accept +'</p></div>'); //*****
   res.write('<div><p>User-Agent : '+ userAgent +'</p></div>');
   res.write('<div><p>Param name : '+ paramName +'</p></div>');
   res.end();
});

http.createServer(app).listen(3000, function(){
    console.log('Express 서버가 3000번 포트에서 시작됨.');
});