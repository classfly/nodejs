var app = require('express')(); //引入express库
var http = require('http').Server(app); //将express注册到http中
var io = require('socket.io')(http);
var gSocket = [];

//当访问根目录时，返回Hello World
app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
    console.log('A user connected!');

    socket.on("join", function (name) {
       gSocket[name] = socket;
       io.emit("join", name);
    });

    socket.on("message", function (msg) {
        io.emit("message", msg);
    })
});

//启动监听，监听3000端口
http.listen(3000, function(){
    console.log('listening on *:3000');
});

