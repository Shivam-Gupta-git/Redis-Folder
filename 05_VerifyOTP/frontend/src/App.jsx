import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Otp from './components/otp'

function App() {

  return (
    <>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/otp' element={<Otp/>}/>
    </Routes>

    </>
  )
}

export default App
