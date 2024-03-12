import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Home'
import Login from './Login'
import Register from './Register'
import Cart from './Cart'
import OrderSummaryItem from './Cart'

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/register" element={< Register/>}></Route>
      <Route path="/cart" element={<OrderSummaryItem />}></Route>
    </Routes>
  )
}

export default AllRoutes