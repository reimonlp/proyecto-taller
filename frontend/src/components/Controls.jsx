import { useContext } from "react"
import { UserContext } from "../App"

// Componente para enviar mensajes
export const Controls = () => {
  const { socket, username } = useContext(UserContext)

  const handleSubmit = (e) => {
    e.preventDefault()    // Evita que se recargue la página

    // Obtiene el mensaje del formulario
    const data = { text: e.target[0].value, username }

    socket.emit('message', data)    // Envía el mensaje al servidor
    e.target[0].value = ''    // Limpia el formulario
    e.target[0].focus()    // Pone el foco en el formulario
  }

  return (
    <section className="controls">
      <form onSubmit={handleSubmit}>
        <input name="msg" placeholder="Escribe tu mensaje aquí..." autoComplete="off" autoFocus required maxLength={255} />
        <button type="submit">Enviar</button>
      </form>
    </section>
  )
}

export default Controls