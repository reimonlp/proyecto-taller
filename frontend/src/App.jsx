/* eslint-disable react/prop-types */
import './style.css'
import Left from './components/Left'
import Messages from './components/Messages'
import Controls from './components/Controls'
import { createContext, useEffect, useState } from 'react'

export const UserContext = createContext()

function App() {
  const [messages, setMessages] = useState([])
  const [users, setUsers] = useState([])

  useEffect(() => {
    setMessages([
      {id: 1, text: "hola, cómo estás?", username: "Messi", ts: "10:45 AM", own: false},
      {id: 2, text: "todo bien y vos?", username: "reimon", ts: "10:46 AM", own: true}
    ])

    setUsers([
      {id: 1, username: "Messi"},
      {id: 2, username: "reimon"}
    ])
  }, [])

  return (
    <UserContext.Provider value={ {messages, users} }>
      <Left />
      <Messages />
      <Controls />
    </UserContext.Provider>
  )
}

export default App
