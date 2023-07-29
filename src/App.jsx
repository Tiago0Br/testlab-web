import { Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import { RequireAuth } from './contexts/Auth/RequireAuth'

function App() {

  return (
    <Routes>
      <Route path='/login' element={<Login />}></Route>
      <Route path='/register' element={<Register />}></Route>
      <Route path='/' element={<RequireAuth> <Home /> </RequireAuth>}></Route>
    </Routes>
  )
}

export default App
