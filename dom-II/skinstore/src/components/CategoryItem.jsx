import styled from "styled-components";
import { mobile } from "../responsive";

const Container = styled.div`
  flex: 1;
  margin: 3px;
  height: 70vh;
  position: relative;
  ${mobile({ height: "35vh" })}
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  ${mobile({ height: "35vh" })}

`;

const Info = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  ${mobile({flexDirection: "row" ,justifyContent:"space-around",alignItems:"center",height:"57vh"})}
`;

const Title = styled.h1`
    color:white;
    margin-bottom: 20px;
    ${mobile({ color:"black",marginBottom:"5px" ,backgroundColor:"white",padding:"3px 6px",borderRadius:"6px"})}
`;

const Button = styled.button`
    border:none;
    padding: 10px;
    background-color: white;
    color:gray;
    cursor: pointer;
    font-weight: 600;
    ${mobile({ backgroundColor:"black", color:"white",marginTop:"20px"})}
`;

const CategoryItem = ({ item }) => {
  return (
    <Container>
      <Image src={item.img} />
      <Info>
        <Title>{item.title}</Title>
        <Button>SHOP NOW</Button>
      </Info>
    </Container>
  );
};

export default CategoryItem;