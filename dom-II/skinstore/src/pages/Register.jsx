import styled from "styled-components";
import { mobile } from "../responsive";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://static.thcdn.com/images/small/webp/widgets/208-us/43/original-1019-STDCRE-42681-DS-AMR-Brand_Rooms_Batching-08-300x180-105943.jpg")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  ${mobile({ height: "60vh"})}
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%",padding:"10px",paddingBottom:"30px"})}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
  ${mobile({ borderRadius:"8px" })}
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  ${mobile({ padding: "10px 8px",borderRadius:"8px" })}
`;

const Register = () => {
  
  const Navigate=useNavigate()
   const [form,setForm]=useState({username:"",fullname:"",mobile:"",email:"",password:"" ,confirmpassword:""})

   function IsValidate(){
    let proceed = true;
    let errMessage="Please fill all the Fields"
    if(form.username===null||form.username===''){
      proceed=false
    }
    if(form.fullname===null||form.fullname===''){
      proceed=false
    }
    
    if(form.password===null||form.password===''){
      proceed=false
    }
    if(form.confirmpassword===null||form.confirmpassword===''){
      proceed=false
    }
    if(form.confirmpassword!==form.password){
      proceed=false
      errMessage="Confirm Password Again"
    }

    
    if(proceed===false){
      toast.warning(errMessage)
    }

    else if(!(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(form.email))){
             proceed=false
             errMessage='Please enter the valid email'
             toast.warning(errMessage)
      }
    
    else if(!(/[^0-9]/g.test(form.mobile))){
      proceed=false
      errMessage='Please enter the valid number'
      toast.warning(errMessage)
    }

    return proceed;
   }

   function handleChange(e){
    const{name,value}=e.target
    setForm({...form,[name]:value})
   }

   async function handleSubmit(e){
    e.preventDefault();
    console.log(form)
    if (IsValidate()){
      
      await fetch(`http://localhost:3000/users`,{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(form)
      })
      .then((res)=>{
        toast.success('Registered Successful')
        Navigate('/login')
      }).catch((err)=>{
        toast.error('Failed : '+err.message)
      })
      setForm({username:"",fullname:"",mobile:"",email:"",password:"" ,confirmpassword:""})
    }
   }
  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form onSubmit={handleSubmit}>
          <Input name="username" placeholder="User name"  onChange={handleChange} value={form.username}/>
          <Input name="fullname" placeholder="Full name" onChange={handleChange} value={form.fullname}/>
          <Input  name="mobile" placeholder="Phone Number" onChange={handleChange} value={form.mobile}/>
          <Input  type="email" name="email" placeholder="email" onChange={handleChange} value={form.email}/>
          <Input type="password" name="password" placeholder="password" onChange={handleChange} value={form.password}/>
          <Input type="password" name="confirmpassword" placeholder="confirm password" onChange={handleChange} value={form.confirmpassword}/>
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <Button type="submit">CREATE</Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;