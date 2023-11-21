/* eslint-disable react/prop-types */
import { useContext } from 'react'
import { UserContext } from '../App'
import Tiempo from './Tiempo'

const Message = ( {data} ) => {
  const {text, username, ts, own} = data
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
          return <Message key={message.id} data={message} />
        }
      )}
    </section>
  )
}

export default Messages