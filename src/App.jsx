import { Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Projects from './pages/Projects'
import { RequireAuth } from './contexts/Auth/RequireAuth'

function App() {

  return (
    <Routes>
      <Route path='/' element={<RequireAuth> <Home /> </RequireAuth>}></Route>
      <Route path='/login' element={<Login />}></Route>
      <Route path='/register' element={<Register />}></Route>
      <Route path='/profile' element={<RequireAuth> <Profile /> </RequireAuth>}></Route>
      <Route path='/projects' element={<RequireAuth> <Projects /> </RequireAuth>}></Route>
    </Routes>
  )
}

export default App
