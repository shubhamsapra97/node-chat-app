const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message');
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
    callback('This is from server');
    // socket.broadcast.emit('newMessage' , {
    //   from: message.from,
    //   text: message.text,
    //   createdAt: new Date().getTime()
    // });
  });

  socket.on('disconnect',()=>{
    console.log('Disconnected from Server');
  });
});

server.listen(port , ()=>{
  console.log(`Server started on port ${port}`);
});
