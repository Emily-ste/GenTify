import { useEffect, useState } from 'react'
import './App.css'
import Login from './components/login'
import Dashboard from './components/dashboard'

const code = new URLSearchParams(window.location.search).get('code') 

function App() {
  return (
    code ? <Dashboard code={code} /> : <Login />
  )
}

export default App
