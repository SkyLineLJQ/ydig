module.exports = {

    /**
     * @description: 
     * @param {socket,io,Array}    
     * @return: 
     */
    serverLogin: (socket, io, UserList) => {
        socket.on('serverLogin', (val) => {
            console.log("服务端接受数据：" + JSON.stringify(val));
            console.log("socket-id：" + socket.id);
            //let allConnectedClients = Object.keys(io.sockets.connected) //获取所有链接数组
            let index = UserList.findIndex((value, index, arr) => {
                return value.socketId === socket.id
            })
            if (index === -1) {
                UserList.push({
                    socketId: socket.id,
                    userName: val.userName,
                    passWord: val.password,
                    img: 'static/img/2.9fb592e9.png'
                })
            }
            let data = {
                UserList: UserList,
                UserId: socket.id,
            }
            io.sockets.emit('memberChange', data.UserList);
            io.sockets.connected[socket.id].emit('setUserInfo',data);
        })
    }
}