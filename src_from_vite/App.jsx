import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.scss'
import SignIn from '../src/pages/SignIn'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Router from './components/main/router'
import ContextProvider from './utility/Context'

const App = () => {
  const [count, setCount] = useState(0)


  return (
    <div className="App">
      <BrowserRouter>
        <ContextProvider>
          <Router />
        </ContextProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
