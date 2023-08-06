import { Navigate, Route, Routes } from 'react-router-dom'
import { Login, Home, Profile, Register, Projects, NewProject } from './pages'
import { RequireAuth } from './contexts/Auth/RequireAuth'
import './App.css'

function App() {

  return (
    <Routes>
      <Route path='/' element={<RequireAuth> <Home /> </RequireAuth>}></Route>
      <Route path='/login' element={<Login />}></Route>
      <Route path='/register' element={<Register />}></Route>
      <Route path='/profile' element={<RequireAuth> <Profile /> </RequireAuth>}></Route>
      <Route path='/projects' element={<RequireAuth> <Projects /> </RequireAuth>}></Route>
      <Route path='/project/new' element={<RequireAuth> <NewProject /> </RequireAuth>}></Route>
      <Route path='*' element={<Navigate to='/' />}></Route>
    </Routes>
  )
}

export default App
