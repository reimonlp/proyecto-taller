import './style.css'

import Left from './components/Left'
import Messages from './components/Messages'
import Controls from './components/Controls'
import Login from './components/Login'

import { createContext, useEffect, useState } from 'react'
import { io } from 'socket.io-client'

export const UserContext = createContext()
const socket = io('ws://localhost:3000', { transports: ['websocket', 'polling'] })

socket.on('connect', () => {
  // console.log('connected with id', socket.id)
})

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
    socket.on('message', (data) => {
      data.own = (socket.id === data.sid)
      setMessages((m) => [...m, data])
    })

    socket.on('users', (data) => {
      console.log(data)
    })
  }, [])

  useEffect(() => {
    socket.emit('setUsername', user)  
  }, [user])

  return (
    <UserContext.Provider value={exports}>
      <Left />
      { !user ? <Login /> : <><Messages /><Controls /></> }
      
    </UserContext.Provider>
  )
}

export default App
