/* eslint-disable react/prop-types */
import { useContext } from 'react'
import { UserContext } from '../App'

// Componente para mostrar los usuarios
const Users = () => {
  const {users, username} = useContext(UserContext)  // Obtiene los usuarios del contexto

  if (users && username) {
    return (
      <ul className='users'>
        {
          Object.keys(users).sort((a, b) => users[a] > users[b] ? 1 : -1)
            .map((i) => <User key={i} username={users[i]} /> )
        }
      </ul>
    )
  }
}

// Componente para mostrar un usuario
const User = ( {username: u} ) => {
  // Obtiene el nombre de usuario propio
  const {username} = useContext(UserContext)

  return (
    // Si el usuario es propio lo marca
    <li><span className={ u === username ? 'me' : null }>{u}</span></li>
  )
}


export default Users