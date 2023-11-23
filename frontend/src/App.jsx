import './style.css'

import Left from './components/Left'
import Messages from './components/Messages'
import Controls from './components/Controls'
import Login from './components/Login'

import { createContext, useEffect, useState } from 'react'
import { io } from 'socket.io-client'

export const UserContext = createContext()
const socket = io('ws://localhost:3000', { transports: ['websocket', 'polling'] })

function App() {
  const [messages, setMessages] = useState([])
  const [users, setUsers] = useState([])
  const [user, setUser] = useState('')
  const [roomSelect, setRoomSelect] = useState(false)

  const exports = {
    socket,
    roomSelect, setRoomSelect,
    messages, setMessages,
    users, setUsers,
    user, setUser,
  }

  useEffect(() => {
    socket.on('messages', (data) => {
      data.forEach(m => m.own = (socket.id === m.sid))
      setMessages(data)
    })

    socket.on('message', (data) => {
      data.own = (socket.id === data.sid)
      setMessages((m) => [...m, data])
    })

    socket.on('users', (data) => {
      //console.log('users:', data)
      setUsers(data)
    })
  }, [])

  useEffect(() => {
    if (user) socket.emit('setUsername', user)  
  }, [user])

  return (
    <UserContext.Provider value={exports}>
      <Left />
      { !user ? <Login /> : <><Messages /><Controls /></> }
      
    </UserContext.Provider>
  )
}

export default App
