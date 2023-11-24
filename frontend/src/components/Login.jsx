import { useContext } from 'react'
import { UserContext } from '../App'
import axios from 'axios'

// Componente para el inicio de sesión
const Login = () => {
  const {setUser} = useContext(UserContext)

  // Función para el inicio de sesión
  const handleLogin = (e) => {
    // Evita que se recargue la página
    e.preventDefault()

    // Obtiene los datos del formulario
    const form = new FormData(e.target)

    // Oculta el mensaje de error
    const status = document.getElementById('status')
    status.setAttribute('hidden', true)

    // Envía los datos al servidor
    axios.post( 'http://localhost:3000/login', Object.fromEntries(form.entries()) )
    // Si el inicio de sesión es exitoso, se guarda el nombre de usuario
    .then( ({data}) => setUser(data.displayName) )
    // Si el inicio de sesión falla, se muestra el error
    .catch( (err) => {
      status.textContent = err.response.data.error
      status.removeAttribute('hidden')
    })
  }

  // Formulario para el inicio de sesión
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