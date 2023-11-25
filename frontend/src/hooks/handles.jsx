import { useEffect, useState } from 'react'
import axios from 'axios'
import { io } from 'socket.io-client'

// Conexión websocket con el servidor
const socket = io('ws://localhost:3000', { transports: ['websocket', 'polling'] })

// Función para manejar el socket
const useInit = () => {
  const [username, setUsername] = useState('') // Nombre de usuario

  // Variables de estado, al cambiarlas se actualizan los componentes
  const [messages, setMessages] = useState([])
  const [users, setUsers] = useState([])

  useEffect(() => {
    // EVENTO: messages -> recibe los mensajes viejos del servidor
    socket.on('messages', (data) => {   
      data.forEach(m => m.own = (username === m.username))  // Agrega la propiedad "own"
      setMessages(data)                                             // Actualiza los mensajes
    })

  // EVENTO: message -> recibe los mensajes nuevos del servidor
    socket.on('message', (data) => {    
      data.own = ( username === data.username)   // Agrega la propiedad "own"
      setMessages((m) => [...m, data])                  // Actualiza los mensajes
    })

  // EVENTO: users -> recibe los usuarios del servidor
    socket.on('users', (data) => setUsers(data))
  }, [username])

  return { username, setUsername, messages, setMessages, users, setUsers }
}

// Función para el inicio de sesión
const useLogin = () => {
  const setUser = useUser()
  
  return (e) => {
    e.preventDefault()  // Evita que se recargue la página

    const form = new FormData(e.target)                // Obtiene los datos del formulario
    const status = document.getElementById('status')    // Obtiene el elemento para mostrar el mensaje
    status.setAttribute('hidden', true)                 // Oculta el mensaje de error
    
    // Envía los datos al servidor
    axios.post( 'http://localhost:3000/login', Object.fromEntries(form.entries()) )
    .then( ({data}) => setUser(data.displayName) )      // Guarda el nombre de usuario
    .catch( (err) => {
      status.textContent = err.response.data.error      // Muestra el mensaje de error
      status.removeAttribute('hidden')                  // Hace visible el mensaje de error
      e.target[0].focus()                               // Pone el foco en el campo usuario
    })
  }
}

// Función para el cierre de sesión
const useLogout = () => {
  const { setUsers, setMessages } = useInit()
  const setUser = useUser()

  return () => {
    socket.disconnect()       // Desconecta el socket
    setUsers([])              // Borra la lista de usuarios
    setMessages([])           // Borra la lista de mensajes
    setUser('')               // Borra el nombre de usuario
  }
}

// Función para enviar mensajes
const useSubmit = () => {
  const { username } = useInit()
  
  return (e) => {
    e.preventDefault()  // Evita que se recargue la página

    const data = { text: e.target[0].value, username }  // Obtiene el mensaje del formulario
    socket.emit('message', data)                                          // Envía el mensaje al servidor

    e.target[0].value = ''  // Limpia el formulario
    e.target[0].focus()     // Pone el foco en el campo de texto
  }
}

// Función para guardar el nombre de usuario
const useUser = () => {
  const { setUsername } = useInit()
  
  return (u) => {
    setUsername(u)                                    // Guarda el nombre de usuario
    if (u) socket.emit('setUsername', u)                    // Envía el nombre de usuario al servidor
  }
}

export { useLogin, useLogout, useSubmit, useInit }