const io = require("socket.io")(3000, {
  cors: { origin: "*" }
})

const connectedUsers = {}

io.on('connection', (socket) => {
  socket.on('setUsername', (username) => {
    socket.username = username
    connectedUsers[socket.id] = username
    io.emit('users', connectedUsers)
    console.log(`Usuario ${username} conectado con ID de socket: ${socket.id}`)
  })

  socket.on('disconnect', () => {
    const username = connectedUsers[socket.id]
    if (!socket.username) return

    delete connectedUsers[socket.id]
    io.emit('users', connectedUsers)
    console.log(`Usuario ${username} desconectado`)
  })

  socket.on('message', (data) => {
    const date = new Date();
    const ts = date.toISOString()

    const emit_data = {
      ...data,
      id: socket.id + '-' + new Date().getTime(),
      sid: socket.id,
      ts
    }
    io.emit('message', emit_data)
  })
})