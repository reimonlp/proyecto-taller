/* eslint-disable react/prop-types */
import { useContext } from 'react'
import { UserContext } from '../App'
import Tiempo from './Tiempo'

// Componente para mostrar un mensaje
const Message = ( {data} ) => {
  const {text, username, ts, own} = data  // Desestructura el mensaje

  return (
    <div className={`message ${own ? 'own' : 'others'}`}>
      <div>
        <p className="text">{text}</p>
        { own ? '' : <div className='username'>{username}</div> }
      </div>
      <footer><Tiempo ts={ts} /></footer>
    </div>
  )
}

// Componente para mostrar los mensajes
const Messages = () => {
  const {messages} = useContext(UserContext)  // Obtiene los mensajes del contexto

  return (
    <section className="messages">
      {messages.map(
        // Crea un componente Message por cada mensaje
        message => <Message key={message.id} data={message} />
      )}
    </section>
  )
}

export default Messages