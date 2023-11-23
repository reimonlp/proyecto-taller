const sqlite = require('sqlite3').verbose();

const { Server } = require("socket.io");
const express = require('express');
const cors = require('cors');
const http = require('http');
const { log } = require('console')

const App = express();
const server = http.createServer(App);
const io = new Server(server);

App.use(cors())
App.use(express.json())

const db = new sqlite.Database('./db.sqlite3', (err) => {
  if (err) console.error(err.message);
  
  db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT NOT NULL, passhash TEXT(60) NOT NULL, displayName TEXT NOT NULL)");
    
    db.run("CREATE TABLE IF NOT EXISTS messages (id TEXT(37) PRIMARY KEY, sid TEXT(20) NOT NULL, text TEXT NOT NULL, ts DATETIME DEFAULT CURRENT_TIMESTAMP)");
  })
})

server.listen(3000, () => {
  console.log('listening on *:3000');
});

App.post('/login', async (req, res) => {
  console.log(req.body)

  const {username: displayName, password} = req.body
  const {hash} = require('bcrypt')
  const passhash = await hash(password, 10)
  const username = String(req.body.username).toLowerCase()

  db.serialize(() => {
    db.run(`SELECT * FROM users WHERE username LIKE '${username}'`, null, (err, rows) => {
      console.log('ERR', err)
      console.log('ROWS', rows)
      //if (err) throw err;
      if (rows === undefined) {
        console.log('INSERTING');
        db.run("INSERT INTO users (username, passhash, displayName) VALUES (?, ?, ?)", [username, passhash, displayName])
        return res.status(200).json({displayName: username})
      } else {
        console.log('passhash', rows[0].passhash)
        console.log('RESULT', (rows[0].passhash == passhash))
        if (rows[0].passhash == passhash)
          return res.status(200).json({displayName: rows[0].displayName})
        else
          return res.status(401).json({error: 'Invalid username or password'})
      }
    })
  })
})

const connectedUsers = {}

io.on('connection', (socket) => {
  socket.on('setUsername', (username) => {
    socket.username = username
    connectedUsers[socket.id] = username
    io.emit('users', connectedUsers)
    
    db.all("SELECT * FROM messages WHERE ts > datetime('now', '-30 minutes')", [], (err, rows) => {
      if (err) throw err;
      socket.emit('messages', rows)
    })
  })

  socket.on('logout', () => {
    if (!socket.username) return
    delete connectedUsers[socket.id]
    io.emit('users', connectedUsers)
  })

  socket.on('disconnect', () => {
    if (!socket.username) return
    delete connectedUsers[socket.id]
    io.emit('users', connectedUsers)
  })

  socket.on('message', (data) => {
    const date = new Date();
    const ts = date.toISOString()

    const emit_data = {
      ...data, id: socket.id + '-' + new Date().getTime(), sid: socket.id, ts
    }
    io.emit('message', emit_data)
    
    db.run("INSERT INTO messages (id, sid, text, ts) VALUES (?, ?, ?, CURRENT_TIMESTAMP)", [emit_data.id, socket.id, data.text])
  })
})