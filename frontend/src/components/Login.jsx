/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useContext } from 'react'
import { UserContext } from '../App'
import axios from 'axios'

const Login = () => {
  const {setUser} = useContext(UserContext)

  const handleLogin = (e) => {
    e.preventDefault()
    const form = new FormData(e.target)
    const url = 'http://localhost:3000/login'
    axios.post(url, Object.fromEntries(form.entries()))
      .then(({data}) => {
        //console.log('displayName', data.displayName)
        setUser(data.displayName)
      })
  }

  return (
    <section className="login">
      <form onSubmit={handleLogin}>
        <fieldset>
          <legend>Inicio de Sesión/Registro</legend>
          <input type="text" name="username" autoComplete='off' autoFocus placeholder='Usuario' required />
          <input type="password" name="password" autoComplete='off' placeholder='Password' required />
          <button type="submit">Entrar</button>
        </fieldset>
      </form>
    </section>
  )
}

export default Login