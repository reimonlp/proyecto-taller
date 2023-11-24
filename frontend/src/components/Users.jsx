/* eslint-disable react/prop-types */
import { useContext } from 'react'
import { UserContext } from '../App'

// Componente para mostrar los usuarios
const Users = () => {
  // Obtiene los usuarios del contexto
  // para mostrarlos
  const {users} = useContext(UserContext)
  
  // Si hay usuarios los muestra
  if (users) {
    return (
      <ul className='users'>
        { Object.keys(users).map(i => <User key={i} username={users[i]} />) }
      </ul>
    )
  }
}

// Componente para mostrar un usuario
const User = ( {username} ) => {
  // Obtiene el nombre de usuario propio
  const {user} = useContext(UserContext)

  return (
    // Si el usuario es propio lo marca
    <li><span className={ username === user ? 'me' : null }>{username}</span></li>
  )
}


export default Users