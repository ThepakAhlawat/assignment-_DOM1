import { Add, Remove } from "@material-ui/icons";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import { mobile } from "../responsive";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TextContext } from "../components/TextContext";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  ${mobile({ padding: "10px", flexDirection: "column" })}
`;

const ImgContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  height: 85vh;
  object-fit: cover;
  ${mobile({ height: "40vh" })}
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 200;
`;

const Desc = styled.p`
  margin: 20px 0px;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;

const AddContainer = styled.div`
  width: 100%;
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: start;
  ${mobile({ width: "100%" })}
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
  margin-right: 30px;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

const Button = styled.button`
  padding: 10px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    background-color: #f8f4f4;
  }
`;

const Product = () => {
  const { Id } = useParams();
  const [singleProduct, setSingleProduct] = useState({});
  const{textOption,setTextOption}=useContext(TextContext)
  const[totalThings,setTotalThings]=useState(0)

  const Navigate=useNavigate()

  async function fetchProduct() {
    try {
      let res = await fetch(`http://localhost:3000/posts/${Id}`);
      let finalres = await res.json();
      setSingleProduct(finalres);
    } catch (error) {
      console.log(error);
    }
  }

  async function TextOption(){
    try {
      let res = await fetch(`http://localhost:3000/Cart/${Id}`);
      let finalres = await res.json();
     if(finalres){
      
      setTextOption(true)
     }

    } catch (error) {
      console.log(error);
    }
  }



  

  async function AddToCart() {
    let totalitems=0
    let isExisting = false;
    let result = await fetch(`http://localhost:3000/Cart`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    let finalresult = await result.json();
    finalresult.map((item)=>{
       totalitems+=item.quantity
    })
    setTotalThings(totalitems)

    if (finalresult.length === 0) {
      const order = {
        id: id,
        image_link: image_link,
        brand: brand,
        quantity: quantity,
        price: price,
        product_type: product_type,
        name: name,
        description: description,
      };
      await fetch(`http://localhost:3000/Cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
      });
    } else {
      setTextOption(true)
      finalresult.map((product) => {
        if (id === product.id) {
          Navigate('/cart')
          isExisting = true;
        }
      });
      if (isExisting == false) {
        const order = {
          id: id,
          image_link: image_link,
          brand: brand,
          quantity: quantity,
          price: price,
          product_type: product_type,
          name: name,
          description: description,
        };
        await fetch(`http://localhost:3000/Cart`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(order),
        });
      }
    }
  }

  useEffect(() => {
    fetchProduct();
    TextOption()
    
  }, [textOption]);

  const {
    image_link,
    name,
    description,
    price,
    quantity,
    id,
    brand,
    product_type,
  } = singleProduct;
  return (
    <Container>
      <Navbar totalThings={totalThings}/>
      <Announcement />
      <Wrapper>
        <ImgContainer>
          <Image src={image_link} />
        </ImgContainer>
        <InfoContainer>
          <Title>{name}</Title>
          <Desc>{description}</Desc>
          <Price>$ {price}</Price>

          <AddContainer>
            <Button onClick={AddToCart}>{textOption?"GO TO CART":"ADD TO CART"}</Button>
          </AddContainer>
        </InfoContainer>
      </Wrapper>
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default Product;












// product.quantity += 1;

// const order = {
//   id: id,
//   image_link: image_link,
//   brand: brand,
//   quantity: product.quantity,
//   price: price,
//   product_type: product_type,
//   name: name,
//   description: description,
// };
// fetch(`http://localhost:3000/Cart/${product.id}`, {
//   method: "PUT",
//   headers: {
//     "Content-Type": "application/json",
//   },
//   body: JSON.stringify(order),
// });