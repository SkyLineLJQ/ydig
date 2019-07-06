const path = require('path');
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const socket_io = require('socket.io');
const loginService = require("./server/models/loginService");
let UserList = [];
var io = socket_io(http);

app.use(express.static(path.join(__dirname + '/public'))); // 静态文件目录
io.on('connection', function (socket) {
        console.log('\033[42;30m' + new Date()+' 一个socket连接了... \033[0m'+socket.id)
        // console.log(io.eio.clientsCount) // 链接数量
        // console.log(socket.adapter.rooms) // 所有房间
        loginService.serverLogin(socket, io, UserList);
        socket.on('disconnect', (reason) => {
            console.log('\033[41;33m '+new Date()+ socket.id + ' has Disconnected...'+'\033[0m');
            console.log(reason);
            // UserList.length = 0
        });
    }),
http.listen(3000, error => {
    if (error) {
        console.log('连接错误:');
        console.log(error);
    } else {
        console.log('Listen *3000')
    }
})