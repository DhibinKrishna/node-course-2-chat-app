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

    let li = jQuery('<li></li>');
    li.text(`${message.from}: ${message.text}`);
    jQuery('#messages').append(li);
});

// socket.emit('createMessage', {
//     from: 'Frank',
//     text: 'Hi'
// }, function (data) {
//     console.log('Acknowledged', data);
// });

jQuery('#message-form').on('submit', function (e) {
    e.preventDefault(); //To prevent form from submitting (default behavior)

    socket.emit('createMessage', {
        from: 'User',
        text: jQuery('[name=message]').val()
    }, function () {

    });
});