import Left from './components/Left'
import Messages from './components/Messages'
import Controls from './components/Controls'
import Login from './components/Login'

import './style.css'

import { useInit } from './hooks/handles'  // Custom hooks para manejar eventos

function App() {
  const { username } = useInit()

  return (
    <>
      <Left />
      { !username ? <Login /> : <><Messages /><Controls /></> }
    </>
  )
}

export default App
