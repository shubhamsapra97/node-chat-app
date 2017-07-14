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
    
    var li = $('<li></li>');
    li.text(`${message.from}: ${message.text}`);
    
    $("#messages").append(li);
});

$("#message-form").on('submit' , function(e){
    e.preventDefault();
    
    socket.emit('createMessage' , {
       from: 'User',
       text: $('[name=message]').val()
    } ,function(){
        
    });
});
