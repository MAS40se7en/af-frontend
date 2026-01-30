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
import MyArtworks from './pages/account/MyArtworks'
import MyPosts from './pages/account/MyPosts'
import ManageInfo from './pages/account/ManageInfo'
import CreateArtwork from './pages/artworks/Create'
import ShowArtwork from './pages/artworks/Show'

function App() {
  return (
    <div className='min-h-188 pb-13'>
      <Routes>
        <Route path='/' element={<UserRoutes />}>
          <Route index element={<Home />} />

          {/** Categories created routes */}
          <Route path='/categories' element={<Categories />} />

          {/** Artists related routes */}
          <Route path='/artists' element={<Artists />} />

          {/** Art works related routes */}
          <Route path='/artworks' element={<Artworks />} />
          <Route path='/create-artwork' element={<CreateArtwork />} />
          <Route path='/artworks/:artworkId/details' element={<ShowArtwork />} />

          {/** Account related routes */}
          <Route path='/account' element={<AccountLayout />}>
            <Route index element={<Profile />} />
            <Route path='/account/my-artworks' element={<MyArtworks />} />
            <Route path='/account/my-posts' element={<MyPosts />} />
            <Route path='/account/manage-info' element={<ManageInfo />} />
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
