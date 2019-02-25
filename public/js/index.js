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

socket.on('newLocationMessage', function (message) {
    let li = jQuery(`<li></li>`);
    let a = jQuery(`<a target="_blank">My current location</a>`)
    li.text(`${message.from}: `);
    a.attr('href', message.url);
    li.append(a);
    jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', function (e) {
    e.preventDefault(); //To prevent form from submitting (default behavior)

    socket.emit('createMessage', {
        from: 'User',
        text: jQuery('[name=message]').val()
    }, function () {

    });
});

let locationButton = jQuery('#send-location'); //reuse - saves time, less expensive
locationButton.on('click', function () {
    if(!navigator.geolocation) {
        return alert('Geolocation is not supported by your browser');
    }

    navigator.geolocation.getCurrentPosition(function (position) {
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function () {
        alert('Unable to fetch location');
    });
});