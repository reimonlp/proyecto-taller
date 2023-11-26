/* eslint-disable react/prop-types */
import { useContext, useEffect, useRef } from 'react'
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
  const messagesRef = useRef(null);

  useEffect(() => {
    // Hacer scroll hacia abajo al elemento más reciente
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages]);
  
  return (
    <section className="messages" ref={messagesRef}>
      {messages.map(
        // Crea un componente Message por cada mensaje
        message => <Message key={message.id} data={message} />
      )}
    </section>
  )
}

export default Messages