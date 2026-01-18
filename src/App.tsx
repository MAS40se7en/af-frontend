import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import UserLayout from './layouts/user-layout'
import Categories from './pages/Categories'
import Artists from './pages/Artists'
import Artworks from './pages/Artworks'
import AuthLayout from './layouts/auth-layout'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'

function App() {
  return (
    <div className='min-h-[47rem] pb-13'>
      <Routes>
        <Route path='/' element={<UserLayout />}>
          <Route index element={<Home />} />
          <Route path='/categories' element={<Categories />} />
          <Route path='/artists' element={<Artists />} />
          <Route path='/artworks' element={<Artworks />} />
        </Route>
        <Route path='/auth' element={<AuthLayout />}>
          <Route path='/auth/login' element={<Login />} />
          <Route path='/auth/register' element={<Register />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
