import React from 'react'

import "../Pages/products.css"
import { useNavigate } from 'react-router-dom'
const Product = ({id,title,image,price,rating}) => {

    const navigate=useNavigate()
  return (
    <div className="card">
        <div><img src={image} alt={title}/></div>
        <div>
            <h3>{title}</h3>
            <h4>{price}</h4>
            <p>{rating.rate}</p>
            <button onClick={()=>{navigate(`/products/${id}`)}}>View details</button>
            
        </div>
    </div>
  )
}

export default Product