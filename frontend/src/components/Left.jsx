import Users from './Users'
import { useLogout, useInit } from '../hooks/handles'

// Componente para mostrar el panel izquierdo
const Left = () => {
  const handleLogout = useLogout()              // Obtiene la función para cerrar sesión
  
  const { username } = useInit()

  return (
    <section className="left">
      <header>
        <span>Chat Room</span>
        { username ? <button title="Logout" onClick={handleLogout}><Exit /></button> : null }
      </header>
      <Users />
    </section>
  )
}

// Componente para mostrar el icono de salida
const Exit = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
      <polyline points="16 17 21 12 16 7"></polyline>
      <line x1="21" x2="9" y1="12" y2="12"></line>
    </svg>
  )
}
export default Left