import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Categories from './pages/Categories'
import Artists from './pages/Artists'
import Artworks from './pages/Artworks'
import PublicOnlyRoute from './routes/public-routes'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import UserRoutes from './routes/user-routes'
import AccountLayout from './layouts/account-layout'
import Profile from './pages/account/Profile'

function App() {
  return (
    <div className='min-h-[47rem] pb-13'>
      <Routes>
        <Route path='/' element={<UserRoutes />}>
          <Route index element={<Home />} />
          <Route path='/categories' element={<Categories />} />
          <Route path='/artists' element={<Artists />} />
          <Route path='/artworks' element={<Artworks />} />
          <Route path='/account' element={<AccountLayout />}>
            <Route index element={<Profile />} />
          </Route>
        </Route>
        <Route path='/auth' element={<PublicOnlyRoute />}>
          <Route path='/auth/login' element={<Login />} />
          <Route path='/auth/register' element={<Register />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
