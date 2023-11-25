import { useLogin } from "../hooks/handles"

// Componente para el inicio de sesión
const Login = () => {
  const handleLogin = useLogin()  // Obtiene la función del hook

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