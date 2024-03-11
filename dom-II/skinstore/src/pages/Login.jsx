import styled from "styled-components";
import {mobile} from "../responsive";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useState } from "react";

const Container = styled.div`
  width:96vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://static.thcdn.com/images/small/webp/widgets/208-us/13/300x180-112613.jpg")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  
`;

const Wrapper = styled.div`
  width: 35%;
  padding: 20px;
  background-color: fbf0f4;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  
  flex:1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
  
  ${mobile({ borderRadius:"8px" })}
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
  ${mobile({ padding: "10px 8px",borderRadius:"8px" })}
`;

const Link1 = styled.div`
  margin: 5px 0px;
  font-weight:500;
  font-size: 13px;
  
  text-decoration: underline;
  cursor: pointer;
`;

const Login = () => {
     const Navigate=useNavigate()
    const [form,setForm]=useState({username:"",password:""})

    function IsValidate(){
      let proceed = true;
      let errMessage="Please fill all the Fields"
      if(form.username===null||form.username===''){
        proceed=false
      }
      
      if(form.password===null||form.password===''){
        proceed=false
      }
      if(proceed===false){
        toast.warning(errMessage)
      }
     return proceed;
    }

    function handleChange(e){
         const{name,value}=e.target;
         setForm({...form,[name]:value})
    }

     async function handleSubmit(e){
      e.preventDefault()
      if(IsValidate()){
       await fetch(`http://localhost:3000/users/?username=${form.username}`).then((res)=>{
          return res.json();
      }).then((resp)=>{
        console.log(resp)
        if(Object.keys(resp).length===0){
        toast.error('Please Enter valid username')
        }
        else{
         console.log(resp.password)
          if(resp[0].password==form.password){
              Navigate('/products')
          }else{
            toast.error('Please Enter Valid Credentials')
          }
        }
       }).catch((err)=>{
        toast.error('login failed due to '+err.message)
       })
      }
    }

  return (
    <Container>
      <Wrapper>
        <Title>SIGN IN</Title>
        <Form  onSubmit={handleSubmit}>
          <Input  name="username" placeholder="username" onChange={handleChange}/>
          <Input  name="password" placeholder="password" onChange={handleChange}/>
          <Button type="submit">LOGIN</Button>
          <Link1><Link to='/register' style={{ color: "rgb(53, 58, 62)", textDecoration:'none' }}>CREATE A NEW ACCOUNT</Link></Link1>
          <Link1><Link style={{ color: "rgb(53, 58, 62)", textDecoration:'none' }}>DO NOT YOU REMEMBER THE PASSWORD?</Link></Link1>
          
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;