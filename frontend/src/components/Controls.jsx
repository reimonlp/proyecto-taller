/* eslint-disable no-unused-vars */
import { useContext } from "react"
import { UserContext } from "../App"

export const Controls = () => {

  const { socket, user, roomSelect } = useContext(UserContext)

  const handleSubmit = (e) => {
    e.preventDefault()
    const data = {
      text: e.target[0].value,
      username: user,
      room: roomSelect
    }
    socket.emit('message', data)
    e.target[0].value = ''
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