/* eslint-disable react/prop-types */
import { useContext } from 'react'
import { UserContext } from '../App'

const Users = () => {
  const {users} = useContext(UserContext)

  return (
    <ul className="users">
      {users.map(user => <User key={user.id} username={user.username} />)}
    </ul>
  )
}

const User = ( {username} ) => {
  return (
    <li>
      <span>{username}</span>
    </li>
  )
}


export default Users