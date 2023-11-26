import { useContext } from 'react'
import { UserContext } from '../App'

// Componente para el inicio de sesión
const Login = () => {
  const {socket} = useContext(UserContext)

  const handleLogin = (e) => {
    e.preventDefault()    // Evita que se recargue la página
    const form = new FormData(e.target)    // Obtiene los datos del formulario
    socket.emit('login', Object.fromEntries(form.entries()))  // Envía los datos al servidor
  }

  return (
    <section className="login">
      <form onSubmit={handleLogin}>
        <fieldset>
          <legend>Inicio de Sesión</legend>
          <input type="text" name="username" autoComplete='off' autoFocus placeholder='Usuario' required maxLength={50} />
          <button type="submit">Entrar</button>
          <div id="status" hidden />
        </fieldset>
      </form>
    </section>
  )
}

export default Login