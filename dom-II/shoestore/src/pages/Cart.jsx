import React from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import { Box } from '@chakra-ui/react'

const Cart = () => {
  return (
    <>
    <Navbar/>
    <Box style={{textAlign:"center" ,height:"30vh", fontWeight:"700" ,fontSize:'19px', marginTop:"50px"}}> No Items To Show Here..</Box>
    <Footer/>
    </>
  )
}

export default Cart