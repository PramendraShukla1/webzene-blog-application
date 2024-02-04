import React from 'react'
import Header from './components/Header'
import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

const Layout = () => {
  return (
   <main>
    <Navbar/>
    {/* <Header/> */}
    <Outlet/>
    <Footer/>
   </main>
  )
}

export default Layout