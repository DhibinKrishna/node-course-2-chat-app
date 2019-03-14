const path = require('path'); //built in module, no need to install
const http = require('http'); //built in module, no need to install
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

const publicPath = path.join(__dirname + '/../public');
//console.log(__dirname + '/../public'); //old way
//console.log(path.join(__dirname + '/../public'));
const port = process.env.PORT || 3000;
var app = express(); //express internally uses http module
// var server = http.createServer((req, res) => {
// });
var server = http.createServer(app);
var io = socketIO(server); //For using socketio, use http module
var users = new Users();

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected');

    // socket.emit('newMessage', {
    //     from: 'Server',
    //     text: 'Hey, what is going on',
    //     createAt: new Date().getTime()
    // });

    // socket.emit('newMessage', generateMessage('Admin', 'Welcome to chat app'));
    // socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));

    socket.on('join', (params, callback) => {
        if (!isRealString(params.name) || !isRealString(params.room)) {
            return callback('Name and room name are required');
        };

        socket.join(params.room); //That's it to join
        //socket.leave('room name');
        users.removeUser(socket.id); //just remove and add
        users.addUser(socket.id, params.name, params.room);

        io.to(params.room).emit('updateUserList', users.getUserList(params.room));

        //io.emit - for all
        //socket.broadcast.emit - for broadcast
        //socket.emit - to specific user

        //io.to('Roomname').emit - for all in the room
        //socket.broadcast.to('Roomname').emit - for room broadcast
        //socket.emit - No separate room specific target, since it is to specific user

        socket.emit('newMessage', generateMessage('Admin', 'Welcome to chat app'));
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined`));

        callback(); //No error parameter reqd
    });

    socket.on('createMessage', (message, callback) => {
        let user = users.getUser(socket.id);

        if (user && isRealString(message.text)) {
            io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
        }

        //callback('Acknowledgement from server');
        callback();

        // socket.broadcast.emit('newMessage', {
        //      from: message.from,
        //      text: message.text,
        //      createAt: new Date().getTime()
        // });
    });

    socket.on('createLocationMessage', (coords) => {
        let user = users.getUser(socket.id);

        if (user) {
            io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
        }
    });

    socket.on('disconnect', () => {
        let user = users.removeUser(socket.id);

        if (user) {
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left.`));
        }
    });
});

server.listen(port, () => { //app.listen inernally uses http.createServer()
    console.log(`Server up on port ${port}`);
});