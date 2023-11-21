/* eslint-disable react/prop-types */
import { useContext } from 'react'
import { UserContext } from '../App'
import Tiempo from './Tiempo'

const Message = ( {text, username, ts, own} ) => {
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

const Messages = () => {
  const {messages} = useContext(UserContext)

  return (
    <section className="messages">
      {messages.map(
        message => {
          return <Message key={message.id} text={message.text} username={message.username} ts={message.ts} own={message.own} />
        }
      )}
    </section>
  )
}

export default Messages