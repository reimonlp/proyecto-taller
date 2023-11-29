import './style.css'

import Left from './components/Left'
import Messages from './components/Messages'
import Controls from './components/Controls'
import Login from './components/Login'

import { createContext, useEffect, useState } from 'react'
import { io } from 'socket.io-client'

// Contexto para compartir datos entre componentes
export const UserContext = createContext()

// detectar si usamos http o https
const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss'

// detectar la url del servidor
const url = window.location.href.split('/')[2]

// Conexión websocket con el servidor
const socket = io(`${protocol}://${url}`, { transports: ['websocket', 'polling'] })

// Componente principal
function App() {
  // Variables de estado, al cambiarlas se actualizan los componentes
  const [messages, setMessages] = useState([])
  const [users, setUsers] = useState([])
  const [username, setUsername] = useState(false)
  
  // Variables a exportar al contexto
  const exports = { socket, messages, setMessages, users, setUsers, username, setUsername }
  
  // Efecto para recibir los mensajes y usuarios
  useEffect(() => {
    // EVENTO: TODOS
    // Muestra todos los eventos que recibe el cliente
    socket.onAny((e) => {
      console.log(`EVENTO: ${e}`)
    })

    // EVENTO: login_success
    // Al iniciar sesión guarda el nombre de usuario
    socket.on('login_success', (data) => {
      setUsername(data.username)
      setUsers(data.users)
      data.messages.forEach(m => m.own = (data.username === m.username))
      setMessages(data.messages)
    })
    
    // EVENTO: login_error
    // Al fallar el inicio de sesión muestra el error
    socket.on('login_error', (err) => {
      const status = document.getElementById('status')
      status.textContent = err.error
      status.removeAttribute('hidden')
    })
    
    if (username) {
      // EVENTO: disconnect
      // Al desconectarse borra el nombre de usuario
      socket.on('disconnect', () => setUsername(false))
    
      // EVENTO: new-message
      // Recibe los mensajes nuevos del servidor
      socket.on('new-message', (data) => {
        data.own = (username === data.username)
        setMessages((messages) => [...messages, data])
      })

      // EVENTO: users
      // Recibe los usuarios del servidor y los guarda en la variable de estado
      socket.on('users', (data) => {
        setUsers(data.users)
      })
    }

    return () => socket.offAny()
  }, [username])

  return (
    <UserContext.Provider value={exports}>
      <Left />
      { !username ? <Login /> : <><Messages /><Controls /></> }
    </UserContext.Provider>
  )
}

export default App
