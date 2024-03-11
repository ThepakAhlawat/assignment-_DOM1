import { Add, Remove } from "@material-ui/icons";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { mobile } from "../responsive";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}

`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
  
`;

const Image = styled.img`
  width: 200px;
  ${mobile({ width: "150px" })}
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  ${mobile({ marginLeft: "20px" })}
`;

const ProductName = styled.span``;

const ProductId = styled.span``;



const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  ${mobile({  flexDirection:"row" ,justifyContent:"center"})}
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  ${mobile({  flex:"1",justifyContent:"center",marginRight:"30px"})}
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px",flex:"1" ,fontSize: "26px",fontWeight:"600" ,marginRight:"30px"})}
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`;

const Cart = () => {

  const[items,setItem]=useState([])
  const[total,settotal]=useState()
  const[totalItems ,setTotalItems]=useState()
  
  useEffect(()=>{
    loadItems()
  },[])


   async function inDec (a,b,c,d,e,){
    if(c==="dec"){
      if(a===1){
        a=1
      }
      else{
        a-=1;
      }
    }
    else{
      if(a===10){
        a=10
        alert("quantity cannot be exceed 10!")
        return
      }else{
        a+=1
      }
    }
      const order={name:d,price:e,quantity:a}
    await fetch(`http://localhost:3000/Cart/${b}`,{
      method:"PATCH",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(order),
    })
    loadItems()
  }

  let totalPrice=0;
  let totalquantity=0;
  async function loadItems(){
    let result=await fetch(`http://localhost:3000/Cart`,{
    method:"GET",
    headers:{
      "Content-Type":"application/json"
    }
   })

   let finalres=await result.json()
   console.log(finalres)
   setItem(finalres)

   finalres.map((product)=>{
    totalPrice+=product.quantity*Number(product.price.replace("$",""))
    totalquantity+=product.quantity
   })
   settotal(totalPrice.toFixed(2))
   setTotalItems(totalquantity)
  }
  return (
    <Container>
      <Navbar totalItems={totalItems}/>
      <Announcement />
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <Link to="/products"><TopButton>CONTINUE SHOPPING</TopButton></Link>
          <TopTexts>
            <TopText>Shopping Bag(2)</TopText>
            <TopText>Your Wishlist (0)</TopText>
          </TopTexts>
          <TopButton type="filled">CHECKOUT NOW</TopButton>
        </Top>
        <Bottom>
          <Info>

             {items.map((item,index)=>{
               return <Product key={item.id}>
              
              <ProductDetail>
                <Image src={item.image_link} />
                <Details>
                  <ProductName>
                    <b>Product:</b> {item.name}
                  </ProductName>
                  <ProductId>
                    <b>ID:</b> {item.id}
                  </ProductId>
                  
                </Details>
              </ProductDetail>
              <PriceDetail>
                <ProductAmountContainer>
                  <button onClick={()=>inDec(item.quantity,item.id,"inc",item.name,item.price)}>+</button>
                  <ProductAmount>{item.quantity}</ProductAmount>
                  <button onClick={()=>inDec(item.quantity,item.id,"dec",item.name,item.price)}>-</button>
                </ProductAmountContainer>
                <ProductPrice>$ {(item.quantity*Number(item.price.replace("$", "")))}</ProductPrice>
              </PriceDetail>
            </Product>})}
            <Hr />
           
            
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>$ {total}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>$ 5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>$ -5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>$ {total}</SummaryItemPrice>
            </SummaryItem>
            <Button>CHECKOUT NOW</Button>
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;