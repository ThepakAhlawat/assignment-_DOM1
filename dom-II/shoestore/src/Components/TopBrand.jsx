import { Box, Image } from '@chakra-ui/react'
import React from 'react'

const TopBrand = () => {
  return (
    <Box display={"flex"} justifyContent={"center"} alignItems={"center"}  height={{md:"500px"}} width={"90%"} margin={"auto"}>
         <Image  width={"85%"}
            height={{md:"450px"}}
            objectFit={"cover"}
           src="https://www.famousfootwear.com/-/media/project/tenant/famous-footwear/famous-footwear/homepage/2024/spring/hero/wk1_020824_site_ads_hero_mobile.jpg"
         
         
         />
    </Box>
  )
}

export default TopBrand