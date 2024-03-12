import { Box, Image } from '@chakra-ui/react'
import React from 'react'

const Video = () => {
  return (
    <Box  display={"flex"} justifyContent={"center"} w={"87%"} m={"auto"} marginTop={"25px"}>
          <Box flex={1}>
          <video 
            
            src="https://www.famousfootwear.com/-/media/project/tenant/famous-footwear/famous-footwear/homepage/2023/spring/1-story/wk4_022123_hp_converse_left.mp"
            loop="loop"
            muted="muted"
            playsInline=""
            autoplay="autoplay"
          ></video>
          </Box>
           <Box flex={1}>
          <Image 
            
            src="https://www.famousfootwear.com/-/media/project/tenant/famous-footwear/famous-footwear/homepage/2023/spring/1-story/wk4_022123_hp_converse_right.jpg"
            alt="img"
          />
          </Box>
        </Box>
  )
}

export default Video