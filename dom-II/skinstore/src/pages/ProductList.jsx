import styled from "styled-components";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Products from "../components/Products";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import { mobile } from "../responsive";
import { useState,useEffect } from "react";
import Product from "../components/Product";
import { Link } from "react-router-dom";

const Container = styled.div``;

const Title = styled.h1`
  margin: 20px;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Filter1 = styled.div`
  margin: 20px;
  ${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })}
`;


const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({ marginRight: "0px" })}
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  ${mobile({ margin: "10px 0px" })}
`;
const Option = styled.option``;

const Container2 = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    ${mobile({ flexDirection:"column"})}
`;

const ProductList = () => {
  
  const [Data,setData]=useState([])
  const [sorting,setsort]=useState("")
  const [filtering,setfilter]=useState(null)

  async function fetchData(){
     try {
      let res =await fetch(`http://localhost:3000/posts`);
      let finalres=await res.json();
      
      setData(finalres)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    fetchData()
   
  },[])


  async function Filter(value){
    
    try {
    let res = await fetch(`http://localhost:3000/posts?product_type=${value}`)
    let finalres=await res.json()
    if(sorting==="asc"){
      let finalres1=finalres.sort((a,b)=>a.price-b.price);
      setData(finalres1)
      
    }
    else if(sorting==="desc"){
      let finalres2=finalres.sort((a,b)=>b.price-a.price);
      setData(finalres2)
      
    }
     else{
      setData(finalres)
      
     }
     setfilter(value)
     } catch (error) {
      console.log(error)
  }
  
}

async function Sort(value){
 console.log(value)
  try {
    let res = await fetch(`http://localhost:3000/posts`)
    let finalres=await res.json()
    console.log(finalres)
     if (filtering){
          let filtered =finalres.filter((a)=>a.product_type===filtering)
           

           if(value==="asc"){
            let finalres1=filtered.sort((a,b)=>a.price-b.price);
            setData(finalres1)
            
          }
          else if(value==="desc"){
            let finalres1=filtered.sort((a,b)=>b.price-a.price);
            setData(finalres1)
            
          }
           
     }

      else if(value==="asc"){
      let finalres=finalres.sort((a,b)=>a.price-b.price);
      setData(finalres)
      
    }
      else if(value==="desc"){
      let finalres=finalres.sort((a,b)=>b.price-a.price);
      setData(finalres)
      
    }
     
     setsort(value)
    } catch (error) {
    console.log(error)
  }
 
}
function HandleFilter(e){
  Filter(e.target.value)
}

function HandleSort(e){
  Sort(e.target.value)
}

  

  return (
    <Container>
      <Navbar productListData={setData}/>
      <Announcement />
      <Title>Beauty Products</Title>
      <FilterContainer>
        <Filter1>
          <FilterText>Filter Products:</FilterText>
          
          <Select name="Type"  onChange={HandleFilter}>
            <Option disabled selected>
              Type
            </Option>
            <Option value="nail_polish">nail_polish</Option>
            <Option value="eyebrow">eyebrow</Option>
            <Option value="eyeliner">eyeliner</Option>
            <Option value="foundation">foundation</Option>
            <Option value="mascara">mascara</Option>
            <Option value="lipstick">lipstick</Option>
            <Option value="bronzer">bronzer</Option>
          </Select>
        </Filter1>
        <Filter1>
          <FilterText>Sort Products:</FilterText>
          <Select name="price" onChange={HandleSort}>
            <Option  disabled selected>Price</Option>
            <Option value="asc">Low To High</Option>
            <Option value="desc">High To Low</Option>
          </Select>
        </Filter1>
      </FilterContainer>
      <Container2>
      { Data.map((item) => {
        return <Link to ={`/products/${item.id}`}><Product item={item} key={item.id} /></Link>
      })}
      </Container2>
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default ProductList;