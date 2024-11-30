// eslint-disable-next-line no-unused-vars
import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './components/Home/Home'
import Login from './components/Login/Login'
import Signup from './components/Signup/Signup'

const RouterComponent = () => {
  return (
    <Router>
      <Routes>
        <Route path='/dashboard' exact element={<Home />} />
        <Route path='/login' exact element={<Login />} />
        <Route path='/signup' exact element={<Signup />} />
      </Routes>
    </Router>
  )
}

const App = () => {
  return (
    <RouterComponent />
  )
}

export default App
