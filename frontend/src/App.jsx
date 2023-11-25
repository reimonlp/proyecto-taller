import './style.css'

import Left from './components/Left'
import Messages from './components/Messages'
import Controls from './components/Controls'
import Login from './components/Login'

import { createContext, useEffect, useRef, useState } from 'react'
import { io } from 'socket.io-client'

// Contexto para compartir datos entre componentes
export const UserContext = createContext()

// Conexión websocket con el servidor
const socket = io('ws://localhost:3000', { transports: ['websocket', 'polling'] })

// Componente principal
function App() {
  // Variables de estado, al cambiarlas se actualizan los componentes
  const [messages, setMessages] = useState([])
  const [users, setUsers] = useState([])

  // Referencia para el nombre de usuario se usa para evitar que se actualice
  // el componente cuando cambia
  const username = useRef(false)

  // Función para guardar el nombre de usuario
  const setUser = (u) => {
    // Guarda el nombre de usuario
    username.current = u

    // Envía el nombre de usuario al servidor
    if (u) socket.emit('setUsername', u)
  }

  // Objeto con las variables de estado y funciones para actualizarlas
  const exports = {
    socket,
    messages, setMessages,
    users, setUsers,
    user: username.current, setUser
  }

  // Efecto para recibir los mensajes y usuarios
  useEffect(() => {
    
    // Recibe los mensajes viejos del servidor
    socket.on('messages', (data) => {

      // Agrega la propiedad "own" a los mensajes para saber si son propios
      data.forEach(m => m.own = (username.current === m.username))

      // Actualiza los mensajes
      setMessages(data)
    })

    // Recibe los mensajes nuevos del servidor
    socket.on('message', (data) => {

      // Agrega la propiedad "own" al mensaje para saber si es propio
      data.own = (username.current === data.username)

      // Actualiza los mensajes
      setMessages((m) => [...m, data])
    })

    // Recibe los usuarios del servidor y los guarda en la variable de estado
    socket.on('users', (data) => setUsers(data))
  }, [])

  return (
    <UserContext.Provider value={exports}>
      <Left />
      { !username.current ? <Login /> : <><Messages /><Controls /></> }
    </UserContext.Provider>
  )
}

export default App
