/* eslint-disable no-unused-vars */
import { useContext } from "react"
import { UserContext } from "../App"

export const Controls = () => {

  const { AgregarMensaje, socket } = useContext(UserContext)

  const handleSubmit = (e) => {
    e.preventDefault()
    socket.emit('message', e.target[0].value)
    AgregarMensaje(e.target[0].value)
    e.target[0].value = ''
    e.target[0].focus()
  }

  return (
    <section className="controls">
      <form onSubmit={handleSubmit}>
        <input name="msg" placeholder="Escribe tu mensaje aquí..." />
        <button type="submit">Enviar</button>
      </form>
    </section>
  )
}

export default Controls