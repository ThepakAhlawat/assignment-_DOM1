
import './App.css'
import { Provider,Carousel,LeftButton, RightButton } from "chakra-ui-carousel";
import { Box, Text} from '@chakra-ui/react';
import { ArrowLeftIcon, ArrowRightIcon} from '@chakra-ui/icons'
import { Link } from 'react-router-dom';

import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AllRoutes from './pages/AllRoutes';

function App() {
  
  

  return (
    <>
       <AllRoutes/>
    
  </>
    
  )
}

export default App
