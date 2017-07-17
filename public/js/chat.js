var socket = io();

function scrollToBottom(){
    var messages = $("#messages");
    var newMessage = messages.children('li:last-child');
    
    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();
    
    if(clientHeight+scrollTop+newMessageHeight+lastMessageHeight >= scrollHeight){
        messages.scrollTop(scrollHeight);
    }
}

//Arrow functions not used in js as arrow fn  will work on chrome but wont work on other browsers or mobile.
socket.on('connect',function(){
  var params = $.deparam(window.location.search);
    
  socket.emit('join' , params , function(err){
      if(err){
          alert(err);
          window.location.href = '/';
      }else{
          console.log('no errors');
      }
  });    
});

socket.on('disconnect' , function(){
  console.log('Disconnected from Server');
});

socket.on('updateUserList' , function(users){
    console.log(users);
    var ol = $('<ol></ol>');
    users.forEach(function(user){
       ol.append($('<li></li>').text(user)); 
    });
    $("#users").html(ol);
});

socket.on('newMessage' , function(message){
  console.log('New Message' , message);
    
      var formattedTime = moment(message.createdAt).format('h:mm a');
//    var li = $('<li></li>');
//    li.text(`${message.from} ${formattedTime}: ${message.text}`);
//    
    var template = $("#message-template").html();
    var html = Mustache.render(template,{
        text: message.text,
        from: message.from,
        createdAt: formattedTime
    });
    $("#messages").append(html);
    scrollToBottom();
});

socket.on('newLocationMessage' , function(message){
    
    var formattedTime = moment(message.createdAt).format('h:mm a');
//    var li = $('<li></li>');
//    var a = $('<a target="_blank">My Location</a>');
//    
//    li.text(`${message.from} ${formattedTime}: `);
//    a.attr('href' , message.url);
//    li.append(a);
    var template = $("#location-message-template").html();
    var html = Mustache.render(template,{
        url: message.url,
        from: message.from,
        createdAt: formattedTime
    });
    $("#messages").append(html);
    scrollToBottom();
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
