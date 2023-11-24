/* eslint-disable react/prop-types */
import { useContext } from 'react'
import { UserContext } from '../App'
import Tiempo from './Tiempo'

// Componente para mostrar un mensaje
const Message = ( {data} ) => {
  // Obtiene el texto, nombre de usuario y fecha del mensaje
  // y si es propio o de otro usuario
  const {text, username, ts, own} = data

  return (
    <div className={`message ${own ? 'own' : 'others'}`}>
      <div>
        <p className="text">{text}</p>
        { /* Si es propio no muestra el nombre de usuario */
        own ? '' : <div className='username'>{username}</div> }
      </div>
      { /* Crear un componente Tiempo para mostrar la fecha */ }
      <footer><Tiempo ts={ts} /></footer>
    </div>
  )
}

// Componente para mostrar los mensajes
const Messages = () => {
  // Obtiene los mensajes del contexto
  // para mostrarlos
  const {messages} = useContext(UserContext)

  return (
    <section className="messages">
      {messages.map(
        // Recorre los mensajes y
        // crea un componente Message por cada mensaje
        message => <Message key={message.id} data={message} />
      )}
    </section>
  )
}

export default Messages