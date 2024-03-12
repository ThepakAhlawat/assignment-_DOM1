import React from 'react'

import Slider1 from '../Components/Slider1'
import Navbar from '../Components/Navbar'
import Video from '../Components/Video'
import TopBrand from '../Components/TopBrand'
import Footer from '../Components/Footer'

const Home = () => {
  return (<>
    <Navbar/>

    <TopBrand/>
    <Slider1/>
    <Video/>
    <Footer/>
    </>
  )
}

export default Home