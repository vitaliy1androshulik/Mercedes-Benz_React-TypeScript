import { Route, Routes } from 'react-router-dom'
import './App.css'
import AppLayout from './components/Layout'
import Home from './components/Home'
import Mercedeses from './components/Mercedeses'
import CreateMercedes from './components/CreateMercedes'
import EditMercedes from './components/EditMercedes'
import Register from './components/Register'
import Login from './components/Login'
import MercedesInfo from './components/MercedesInfo'


function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path='/mercedeses' element={<Mercedeses />} />
          <Route path='/create' element={<CreateMercedes />} />
          <Route path='/details/:id' element={<MercedesInfo />} />
          <Route path='/edit/:id' element={<EditMercedes />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='*' element={<p>Page Not Found!</p>} />
        </Route>
      </Routes>
    </>
  )
}

export default App
