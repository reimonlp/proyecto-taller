import Users from './Users'
import { useContext } from 'react'
import { UserContext } from '../App'

const Left = () => {
  const { setUser, setUsers, setMessages, socket, user } = useContext(UserContext)
  
  const handleLogout = () => {
    setUser('')
    setUsers([])
    setMessages([])
    socket.emit('logout')
  }

  return (
    <section className="left">
      <header>
        <span>Chat Room</span>
        { user ?
          <button title="Salir del Chat Room" onClick={handleLogout}><Exit /></button>
          : null
        }
      </header>
      <Users />
    </section>
  )
}

const Exit = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
      <polyline points="16 17 21 12 16 7"></polyline>
      <line x1="21" x2="9" y1="12" y2="12"></line>
    </svg>
  )
}
export default Left