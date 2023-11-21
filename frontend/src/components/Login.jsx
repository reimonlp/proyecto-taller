/* eslint-disable react/prop-types */
import { useContext } from 'react'
import { UserContext } from '../App'

const Login = () => {
  const {setUser} = useContext(UserContext)

  const handleLogin = (e) => {
    e.preventDefault()
    const form = new FormData(e.target)
    setUser(form.get('username'))
  }

  return (
    <section className="login">
      <form onSubmit={handleLogin}>
        <fieldset>
          <legend>Ingrese un nombre de usuario</legend>
          <input type="text" name="username" autoComplete='off' />
          <button type="submit">Entrar</button>
        </fieldset>
      </form>
    </section>
  )
}

export default Login