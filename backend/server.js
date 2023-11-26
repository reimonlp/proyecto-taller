// Se importan los módulos express y cors
const express = require('express');
const cors = require('cors');
const http = require('http');

// Se crea una instancia de express
const App = express();

// Se importa el módulo Server de socket.io
const { Server } = require("socket.io");

// Se crea una instancia del servidor http con la instancia de express
const server = http.createServer(App);
const io = new Server(server);

// Se configura el servidor para que acepte peticiones de cualquier origen
App.use(cors())

// Se configura el servidor para que acepte peticiones con el formato JSON
App.use(express.json())

// Se crea un objeto para guardar los usuarios conectados
const connectedUsers = {}

// Se importa el módulo sqlite3
const sqlite = require('sqlite3').verbose();

// Se crea una instancia de la base de datos
const db = new sqlite.Database('./db.sqlite3', (err) => {
  // Se lanza un error si no se puede conectar a la base de datos
  if (err) throw err;
  
  // Se crea la tabla de mensajes si no existe
  db.run( "CREATE TABLE IF NOT EXISTS messages (id TEXT(37) PRIMARY KEY, username TEXT(50) NOT NULL, text TEXT NOT NULL, ts DATETIME DEFAULT CURRENT_TIMESTAMP)" )

  // Se inicia el servidor
  server.listen(3000, () => console.log('listening on *:3000') );
})  

// una vez que se conecta un usuario; se crea una instancia de socket para esa conexiónn
// se escuchan los eventos que emite el cliente y se emiten los eventos que correspondan
//
io.on('connection', (socket) => {

  // elimina los mensajes con más de 60 minutos de antiguedad
  db.run("DELETE FROM messages WHERE ts < datetime('now', '-60 minutes')" )

  // evento: setUsername
  // - se recibe el username del cliente y se guarda en el socket
  // - se guarda el username en un objeto con el id del socket
  // - se emite a todos los clientes conectados la lista de usuarios
  // - se emiten los mensajes de los últimos 30 minutos al cliente
  //
  socket.on('login', ({username}) => {
    if (username.length > 50 || username.length == 0)
      return socket.emit('login_error', { error: "Nombre inválido" });

    // si el usuario ya existe se devuelve un error
    if (Object.values(connectedUsers).includes(username))
      socket.emit('login_error', { error: "Ya existe ese usuario" });
    else {
      connectedUsers[socket.id] = username
      
      db.all(
        "SELECT * FROM messages WHERE ts > datetime('now', '-30 minutes')", [],
        (err, rows) => {
          if (err) throw err
          socket.emit('login_success', {username, users:connectedUsers, messages:rows})
        }
      )

      socket.broadcast.emit('users', {users:connectedUsers})
    }
  })

  // evento: logout
  // - se elimina el usuario del objeto de usuarios conectados
  // - se emite a todos los clientes conectados la lista de usuarios
  //
  socket.on('logout', () => {
    delete connectedUsers[socket.id]
    socket.broadcast.emit('users', connectedUsers)
  })

  // evento: disconnect
  // - se elimina el usuario del objeto de usuarios conectados
  // - se emite a todos los clientes conectados la lista de usuarios
  //
  socket.on('disconnect', () => {
    delete connectedUsers[socket.id]
    socket.broadcast.emit('users', connectedUsers)
  })

  // evento: message
  // - se recibe el mensaje del cliente
  // - se agrega el id del socket y la fecha al mensaje
  // - se emite el mensaje a todos los clientes conectados
  // - se guarda el mensaje en la base de datos
  //
  socket.on('message', (data) => {
    const date = new Date();

    if (data.text.length > 255 || data.text.length == 0) return

    // se agrega el id del socket y la fecha al mensaje
    const emitData = {
      ...data,
      id: `${socket.id}-${date.getTime()}`,
      ts: date.toISOString()
    }

    // se emite el mensaje a todos los clientes conectados
    io.emit('new-message', emitData)
    
    // se guarda el mensaje en la base de datos
    db.run(
      "INSERT INTO messages (id, username, text) VALUES (?, ?, ?)", 
      [emitData.id, data.username, data.text]
    )
  })
})