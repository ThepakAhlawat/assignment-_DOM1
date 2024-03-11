import React, { useState, useRef, useEffect } from "react";

import { Badge } from '@material-ui/core';

import { Search, ShoppingCartOutlined } from "@material-ui/icons";

import styled from "styled-components";
import { mobile } from "../responsive";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { TextContext } from "./TextContext";

const Container = styled.div`
  height: 60px;
  margin-bottom:10px;
  text-decoration: none;
  ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
  padding: 0px 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;



const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
  ${mobile({ marginLeft: "3px" })}
`;

const Input = styled.input`
  border: none;
  outline:0px solid transparent;
  ${mobile({ width: "55px"  })}
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
  ${mobile({ marginLeft: "20px" })}
`;

const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: "24px" })}
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
  `;

const Navbar = ({totalItems,totalThings,productListData}) => {
  const[total,settotal]=useState(0)
  const searchref = useRef(null)
  const{setHomeProducts}=useContext(TextContext)

  
  useEffect(()=>{
    loadItems()
  },[totalItems,totalThings])
  
  let totalProduct=0
  async function loadItems(){
    let result=await fetch(`http://localhost:3000/Cart`,{
    method:"GET",
    headers:{
      "Content-Type":"application/json"
    }
   })

   let finalres=await result.json()
   
   finalres.map((totalItem)=>{
    totalProduct+=totalItem.quantity
   })
   settotal(totalProduct)
  }

      async function searchValue(value){
        console.log(value)
    let result=await fetch(`http://localhost:3000/posts?q=${value}`)
    let finalres=await result.json();
    console.log(finalres)
      productListData(finalres)
      setHomeProducts(value)

      }

    function handleSearch(e){
       clearTimeout(searchref.current)
       searchref.current=setTimeout(()=>{
            searchValue(e.target.value)
       },1000)
  }
  
  return (
    <>
      <Container>
      <Wrapper>
        <Left>
          
          <SearchContainer>
            <Input placeholder="Search"  onChange={handleSearch}/>
            <Search style={{ color: "gray", fontSize: 16 }} />
          </SearchContainer>
        </Left>
        <Center>
          <Logo>SkinStore</Logo>
        </Center>
        <Right>
          <MenuItem><Link to="/register" style={{ color: "gray", textDecoration:'none' }}>REGISTER</Link></MenuItem>
          <MenuItem><Link to="/login" style={{ color: "gray", textDecoration:'none' }}>SIGN IN</Link></MenuItem>
          <Link to="/cart" style={{ color: "gray", textDecoration:'none' }}>
          <MenuItem>
            <Badge badgeContent={total} color="primary">
              <ShoppingCartOutlined />
            </Badge>
          </MenuItem>
          </Link>
        </Right>
      </Wrapper>
    </Container>
    </>
  );
};

export default Navbar;
