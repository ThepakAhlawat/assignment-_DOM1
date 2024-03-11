import styled from "styled-components";
import { popularProducts } from "../data";
import Product from "./Product";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { TextContext } from "./TextContext";
import { mobile } from "../responsive";

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    ${mobile({ flexDirection:"column"})}
`;

const Products = () => {
  
  const{homeProducts}=useContext(TextContext)
  const [Data,setData]=useState([])
  
  async function fetchData(){
    console.log(homeProducts)
    try {
     let res =await fetch(`http://localhost:3000/posts?q=${homeProducts}`);
     let finalres=await res.json();
     
     setData(finalres)
   } catch (error) {
     console.log(error)
   }
 }

 


 useEffect(()=>{
   fetchData()
  
 },[homeProducts])
  
  return (
    <Container>
      {Data&& Data.map((item) => (
        <Link to={`/products/${item.id}`}><Product item={item} key={item.id} /></Link>
      ))}
    </Container>
  );
};

export default Products;