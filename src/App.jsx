import {Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Login from './App/Login/page';
import './App.css'

function App() {
return (
  <>
<AuthProvider>
 
    <Routes>
       <Route path='/'element={<Login/>}/>
    </Routes>
 
  </AuthProvider>
  </>
  )
}

export default App
