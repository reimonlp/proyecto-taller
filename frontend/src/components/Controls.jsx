import { useSubmit } from "../hooks/handles"

// Componente para enviar mensajes
export const Controls = () => {
  const handleSubmit = useSubmit() // Obtiene la función del hook

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