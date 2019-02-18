const path = require('path'); //built in module, no need to install
const http = require('http'); //built in module, no need to install
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname + '/../public');
//console.log(__dirname + '/../public'); //old way
//console.log(path.join(__dirname + '/../public'));
const port = process.env.PORT || 3000;

var app = express(); //express internally uses http module
// var server = http.createServer((req, res) => {
// });
var server = http.createServer(app);
var io = socketIO(server); //For using socketio, use http module
app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected');

    // socket.emit('newMessage', {
    //     from: 'Server',
    //     text: 'Hey, what is going on',
    //     createAt: new Date().getTime()
    // });

    socket.emit('newMessage', {
        from: 'Admin',
        text: 'Welcome to the chat app',
        createdAt: new Date().getTime()
    });

    socket.broadcast.emit('newMessage', {
        from: 'Admin',
        text: 'New user joined',
        createdAt: new Date().getTime()
    });

    socket.on('createMessage', (message) => {
        console.log('createMessaage', message);
        io.emit('newMessage', {
            from: message.from,
            text: message.text,
            createAt: new Date().getTime()
        });
        // socket.broadcast.emit('newMessage', {
        //      from: message.from,
        //      text: message.text,
        //      createAt: new Date().getTime()
        // });
    });

    socket.on('disconnect', () => {
        console.log('User was disconnected');
    });
});

server.listen(port, () => { //app.listen inernally uses http.createServer()
    console.log(`Server up on port ${port}`);
});