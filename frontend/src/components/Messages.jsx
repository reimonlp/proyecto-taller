/* eslint-disable react/prop-types */
import { useInit } from '../hooks/handles'
import Tiempo from './Tiempo'

// Componente para mostrar un mensaje
const Message = ( {data} ) => {
  const {text, username, ts, own} = data        // Desestructura los datos del mensaje

  return (
    <div className={`message ${own ? 'own' : 'others'}`}>
      <div>
        <p className="text">{text}</p>
        { own ? null : <div className='username'>{username}</div> }
      </div>
      <footer><Tiempo ts={ts} /></footer>
    </div>
  )
}

// Componente para mostrar los mensajes
const Messages = () => {
  const {messages} = useInit()

  return (
    <section className="messages">
      {messages.map(
        // Recorre los mensajes y crea un componente Message por cada mensaje
        message => <Message key={message.id} data={message} />
      )}
    </section>
  )
}

export default Messages