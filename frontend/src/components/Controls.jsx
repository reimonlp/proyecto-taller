import { useContext } from "react"
import { UserContext } from "../App"

// Componente para enviar mensajes
export const Controls = () => {
  // Obtiene las variables de estado y funciones
  // para actualizarlas
  const { socket, user } = useContext(UserContext)

  const handleSubmit = (e) => {
    // Evita que se recargue la página
    e.preventDefault()

    // Obtiene el mensaje del formulario
    const data = { text: e.target[0].value, username: user }

    // Envía el mensaje al servidor
    socket.emit('message', data)

    // Limpia el formulario
    e.target[0].value = ''

    // Pone el foco en el formulario
    e.target[0].focus()
  }

  return (
    <section className="controls">
      <form onSubmit={handleSubmit}>
        <input name="msg" placeholder="Escribe tu mensaje aquí..." autoComplete="off" autoFocus />
        <button type="submit">Enviar</button>
      </form>
    </section>
  )
}

export default Controls