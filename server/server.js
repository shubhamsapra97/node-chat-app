const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage,generateLocationMessage} = require('./utils/message');
const publicPath = path.join(__dirname , '../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection' , (socket)=>{
  console.log('New user connected');

  socket.emit('newMessage' , generateMessage('Admin' , 'Welcome to Node Chat App'));

  socket.broadcast.emit('newMessage' , generateMessage('Admin','New User Joined'));

  socket.on('createMessage' , (message,callback)=>{
    console.log('Created Message' , message);

    io.emit('newMessage' , generateMessage(message.from,message.text));
    callback();
  });
    
  socket.on('createLocationMessage' , (coords)=>{
     io.emit('newLocationMessage' , generateLocationMessage('User' , coords.latitude , coords.longitude));
  });

  socket.on('disconnect',()=>{
    console.log('Disconnected from Server');
  });
});

server.listen(port , ()=>{
  console.log(`Server started on port ${port}`);
});
