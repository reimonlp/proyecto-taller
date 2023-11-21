const Controls = () => {

  const handleSubmit = (e) => {
    e.preventDefault()
    const message = e.target[0].value
    console.log(message)
    e.target[0].value = ''
  }

  return (
    <section className="controls">
      <form onSubmit={handleSubmit}>
        <input placeholder="Escribe tu mensaje aquí..." />
        <button type="submit">Enviar</button>
      </form>
    </section>
  )
}

export default Controls