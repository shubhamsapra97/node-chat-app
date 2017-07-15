var socket = io();

//Arrow functions not used in js as arrow fn  will work on chrome but wont work on other browsers or mobile.
socket.on('connect',function(){
  console.log('Connected to Server');
});

socket.on('disconnect' , function(){
  console.log('Disconnected from Server');
});

socket.on('newMessage' , function(message){
  console.log('New Message' , message);
    
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var li = $('<li></li>');
    li.text(`${message.from} ${formattedTime}: ${message.text}`);
    
    $("#messages").append(li);
});

socket.on('newLocationMessage' , function(message){
    
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var li = $('<li></li>');
    var a = $('<a target="_blank">My Location</a>');
    
    li.text(`${message.from} ${formattedTime}: `);
    a.attr('href' , message.url);
    li.append(a);
    $("#messages").append(li);
});

$("#message-form").on('submit' , function(e){
    e.preventDefault();
    
    socket.emit('createMessage' , {
       from: 'User',
       text: $('[name=message]').val()
    } ,function(){
       $('[name=message]').val(' ');    
    });
});

$("#send-location").on('click' , function(){
    
    if(!navigator.geolocation){
        return alert('Geolocation not supported by your browser');
    }
    
    $("#send-location").attr('disabled' , 'disabled').text('Sending location...');
    
    navigator.geolocation.getCurrentPosition(function(position){
        $("#send-location").removeAttr('disabled').text('Send location');
        socket.emit('createLocationMessage' , {
           latitude: position.coords.latitude,
           longitude: position.coords.longitude
        });
    } , function(){
        $("#send-location").removeAttr('disabled').text('Send location');
       alert('Unable to fetch location'); 
    });
    
});
