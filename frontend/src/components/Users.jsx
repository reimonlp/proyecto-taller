/* eslint-disable react/prop-types */
import { useInit } from '../hooks/handles'

// Componente para mostrar los usuarios
const Users = () => {
  const {users} = useInit()
  
  if (users) {
    return (
      <ul className='users'>
        { Object.keys(users).map(i => <User key={i} username={users[i]} />) }
      </ul>
    )
  }
}

// Componente para mostrar un usuario
const User = ( {username: u} ) => {
  const {username} = useInit()

  return (
    <li><span className={ username === u ? 'me' : null }>{u}</span></li>
  )
}

export default Users