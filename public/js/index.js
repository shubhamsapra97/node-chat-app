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
});
