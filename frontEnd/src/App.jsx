import { useState } from 'react'
import Nav from './components/Nav'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Footer from './components/Footer'
import SignUp from './components/SignUp'
import Login from './components/Login'
import PrivateComponent from './components/PrivateComponent'
import AddProduct from './components/AddProduct'
import Products from './components/Products'
import UpdateProduct from './components/UpdateProduct'

import './App.css'

function App() {

  return (
    <div>
      <BrowserRouter>
      <Nav />
      <Routes>
        <Route element={<PrivateComponent/>}>
          <Route path='/' element={<Products/>}/>
          <Route path='/update/:id' element={<UpdateProduct/>}/>
          <Route path='/add' element={<h1>{<AddProduct/>}</h1>}/>
          <Route path='/logout' element={<h1>Logout Page</h1>}/>
          <Route path='/profile' element={<h1>Profile Summury</h1>}/>
        </Route>

        <Route path='/signUp' element={<SignUp/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
      </BrowserRouter>
      <Footer/>
    </div>
    
  )
}

export default App
