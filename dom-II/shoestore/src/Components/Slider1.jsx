import React from 'react'

import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const Slider1 = () => {

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 2,
        nextArrow: (
          <div>
            <div className="next-slick-arrow"> » </div>
          </div>
        ),
        prevArrow: (
          <div>
            <div className="prev-slick-arrow"> « </div>
          </div>
        ),
        responsive: [
          {
            breakpoint: 900,
            settings: {
              arrows: true,
              slidesToShow: 3
            }
          },
          {
            breakpoint: 500,
            settings: {
              arrows: false,
              slidesToShow: 2
            }
          },
          {
            breakpoint: 400,
            settings: {
              arrows: false,
              slidesToShow: 1
            }
          }
        ]
      };
      const slidesData = [
        {
          id: 1,
          title: 'Adidas',
          label: 'Alpha Sneaker',
          img:'https://www.famousfootwear.com/blob/product-images/20000/41/98/0/41980_pair_medium.jpg'
        }, {
          id: 2,
          title: 'Nike',
          label: 'Women Gamma Force',
          img:'https://www.famousfootwear.com/blob/product-images/20000/32/12/5/32125_pair_medium.jpg'
        }, {
          id: 3,
          title: `Dr Scholl's`,
          label: 'Kids Time Off Sneaker',
          img:'https://www.famousfootwear.com/blob/product-images/20000/72/75/5/72755_pair_medium.jpg'
        }, {
          id: 4,
          title: 'Crocs ',
          label: 'Kids Classic Toddler.',
          img:'https://www.famousfootwear.com/blob/product-images/20000/47/02/8/47028_pair_medium.jpg'
        }, {
          id: 5,
          title: 'Nike',
          label: 'Womens Air MAx SC',
          img:'https://www.famousfootwear.com/blob/product-images/20000/40/14/2/40142_pair_medium.jpg'
        }, {
          id: 6,
          title: 'Nike',
          label: 'Womens Court Legacy',
          img:'https://www.famousfootwear.com/blob/product-images/20000/47/32/9/47329_pair_medium.jpg'
        },
      ];
  return (
    <>
      
    <div className="slider-wrapper">

    <Slider {...settings}>

      {slidesData.map((slide) =>(

        <div className="slick-slide" key={slide.id}>
          <div className="slick-slide-imager"><img src={slide.img} /></div>
          <h2 className="slick-slide-title">{slide.title}</h2>
          <p className='slick-slide-label'>{slide.label}</p>
        </div>
      )

      )}

    </Slider>

  </div>
  </>
  )
}

export default Slider1