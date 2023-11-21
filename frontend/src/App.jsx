import './style.css'
import Left from './components/Left'
import Messages from './components/Messages'
import Controls from './components/Controls'
import { createContext, useEffect, useState } from 'react'
import moment from 'moment'

export const UserContext = createContext()

function App() {
  const [messages, setMessages] = useState([])
  const [users, setUsers] = useState([])
  const [user, setUser] = useState('')

  moment.locale('es')
  moment.updateLocale('es', {
    calendar : {
        lastDay : '[ayer a las] LT',
        sameDay : '[hoy a las] LT',
        nextDay : '[mañana a las] LT',
        lastWeek : 'dddd [a las] LT',
        nextWeek : 'dddd [a las] LT',
        sameElse : 'L'
    }
  })

  const AgregarMensaje = (mensaje) => {
    setMessages([
      ...messages,
      {
        id: messages.length + 1,
        text: mensaje,
        username: user,
        ts: moment(new Date()).calendar(),
        own: true,
      },
    ])
  }

  const exports = {
    messages, setMessages,
    users, setUsers,
    user, setUser,
    AgregarMensaje
  }

  useEffect(() => {
    setMessages([
      {id: 1, text: "hola, cómo estás?", username: "Messi", ts: "2023-11-19T10:45:00.000Z", own: false},
      {id: 2, text: "todo bien y vos?", username: "reimon", ts: "2023-11-20T10:46:10.000Z", own: true}
    ])

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
