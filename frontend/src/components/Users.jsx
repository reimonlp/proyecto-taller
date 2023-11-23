/* eslint-disable react/prop-types */
import { useContext } from 'react'
import { UserContext } from '../App'

const Users = () => {
  const {users} = useContext(UserContext)

  console.log('users', users)

  if (users) {
    return (
      <ul className='users'>
        { Object.keys(users).map(i => <User key={i} username={users[i]} />) }
      </ul>
    )
  }
}

const User = ( {username} ) => {
  return (
    <li>
      <span>{username}</span>
    </li>
  )
}


export default Users