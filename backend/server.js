const io = require('socket.io')(3000, {
  cors: {
    origin: '*',
  },
});

io.on('connection', (socket) => {
  console.log('connected');
  socket.on('message', (data) => {
    console.log(data);
    socket.broadcast.emit('message', data);
  });
});