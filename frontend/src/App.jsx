import './style.css'
import Left from './components/Left'
import Messages from './components/Messages'
import Controls from './components/Controls'
import { createContext, useEffect, useState } from 'react'
import { io } from 'socket.io-client'

export const UserContext = createContext()

function App() {
  const [messages, setMessages] = useState([])
  const [users, setUsers] = useState([])
  const [user, setUser] = useState('')

  const AgregarMensaje = (mensaje) => {
    setMessages([
      ...messages,
      {
        id: messages.length + 1,
        text: mensaje,
        username: user,
        ts: new Date(),
        own: true,
      },
    ])
  }

  const socket = io('http://localhost:3000')
  socket.on('connect', () => {
    socket.on('message', (msg) => {
      setMessages([
        ...messages,
        {
          id: messages.length + 1,
          text: msg,
          username: 'Messi',
          ts: new Date(),
          own: false,
        },
      ])
    })
  })

  const exports = {
    socket,
    messages, setMessages,
    users, setUsers,
    user, setUser,
    AgregarMensaje
  }

  useEffect(() => {
    setUsers([
      {id: 1, username: "Messi"},
      {id: 2, username: "reimon"}
    ])
  }, [])

  return (
    <UserContext.Provider value={exports}>
      <Left />
      <Messages />
      <Controls />
    </UserContext.Provider>
  )
}

export default App
