module.exports = {
    /**
     * @description: 
     * @param {socket,io,Array}    
     * @return: 
     */
    serverLogin: (socket, io, UserList) => {
        socket.on('serverLogin', (val) => {
            console.log("登录参数[serverLogin]：" + JSON.stringify(val));
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
            io.sockets.connected[socket.id].emit('setUserInfo', data);
        })
    },
    ChatMessages: (socket, io) => {
        socket.on('ChatMessages', (val) => {
            // console.log('发送消息[ChatMessages]:' + JSON.stringify(val))
            let d = new Date().getTime();
            let Uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                var r = (d + Math.random()*16)%16 | 0;
                d = Math.floor(d/16);
                return (c=='x' ? r : (r&0x7|0x8)).toString(16);
            });
            let data = {
                msgId: Uuid,
                sendId: socket.id,
                receiveId: val.currentId,
                text: val.messages,
                createTime: new Date(),
            }
            console.log('发送消息[ChatMessages]:' + JSON.stringify(data))
            io.sockets.emit('saveHistory', data);
        })
    },
}