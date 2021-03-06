/**
 * Router 객체를 이용해 라우팅 함수 등록하기
 * POST로 요청할 때 URL 파라미터를 params 객체로 확인
 *
 * (1) 웹 브라우저에서 http://localhost:3000/public/login3.html 페이지 열고 요청
 * (2) 크롬 브라우저 : POST 방식으로 요청
 */

// Express 기본 모듈 불러오기
var express = require('express')
  , http = require('http')
  , path = require('path');

// Express의 미들웨어 불러오기
var bodyParser = require('body-parser')
  , static = require('serve-static')
  , errorHandler = require('errorhandler');
  
var expressErrorHandler = require('express-error-handler');

// 익스프레스 객체 생성
var app = express();

// 기본 속성 설정
app.set('port', process.env.PORT || 3000);

// body-parser를 이용해 application/x-www-form-urlencoded 파싱
app.use(bodyParser.urlencoded({ extended: false }))

// body-parser를 이용해 application/json 파싱
app.use(bodyParser.json())

app.use('/public', static(path.join(__dirname, 'public')));


// 라우터 사용하여 라우팅 함수 등록
var router = express.Router();

router.route('/process/login/:id').post(function(req, res) {
	console.log('/process/login/:id 처리함.');
	var paramId = req.params.id;
	console.log('/process/users와 토큰 %s를 이용해 처리함.', paramId);
    var paramName = req.body.name || req.query.name;
	var paramPassword = req.body.password || req.query.password;
	
	res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
	res.write('<h1>Express 서버에서 응답한 결과입니다.</h1>');
	res.write('<div><p>Param id : ' + paramId + '</p></div>');
    res.write('<div><p>Param name : ' + paramName + '</p></div>');
	res.write('<div><p>Param password : ' + paramPassword + '</p></div>');
	res.write("<br><br><a href='/public/login4.html'>로그인 페이지로 돌아가기</a>");
	res.end();
});

app.use('/', router);

//404 에러 페이지 처리
var errorHandler = expressErrorHandler({
	static:{
		'404':'./public/404.html'
	}
});
app.use(expressErrorHandler.httpError(404));
app.use(errorHandler);

// Express 서버 시작
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});