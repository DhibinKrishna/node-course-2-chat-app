var socket = io();

socket.on('connect', function () { //built-in event
    console.log('Connected to server');

    // socket.emit('createMessage', {
    //     from: 'dk',
    //     text: 'Hey, how are you?'
    // });
});

socket.on('disconnect', function () { //built-in event
    console.log('Disconnected from server');
});

socket.on('newMessage', function (message) {
    console.log('New message', message);
});