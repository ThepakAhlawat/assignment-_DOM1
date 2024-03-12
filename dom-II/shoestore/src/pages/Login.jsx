import React, { useState } from "react";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  useToast,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";




 

const Login = () => {
  const toast = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const LoginFunc = () => {
    navigate("/")
    const payload = {
      email,
      password,
    };
    console.log(email,password)
    try {
      fetch(`https://reqres.in/api/login`, {
        method: "POST",
        
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(payload),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res) {
            console.log(res.token)
           
            toast({
              status: "success",
              duration: 5000,
              title: 'login successful... ',
              isClosable: true,
            });
          }
          
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
      alert("Something Wrong");
    }
  };

  return (
    <>
      <Navbar />
      <Box>
        <Flex align={"center"} justify={"center"} bg={"gray.50"} m="auto">
          <Stack
            spacing={8}
            mx={"auto"}
            width={{ base: "100%", md: "35%" }}
            py={12}
            px={6}
          >
            <Stack align={"center"}>
              <Heading color={"#002E6E"} fontSize={"4xl"}>
                Log in to your account
              </Heading>
            </Stack>
            <Box rounded={"lg"} bg={"gray.50"} boxShadow={"lg"} p={8}>
              <Stack spacing={2}>
                <FormControl id="email">
                  <FormLabel>Email address</FormLabel>
                  <Input
                    focusBorderColor="#002E6E"
                    borderColor={"#002E6E"}
                    placeholder="Enter @gmail.com"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormControl>

                <FormControl id="password">
                  <FormLabel>Password</FormLabel>
                  <Input
                    focusBorderColor="#002E6E"
                    borderColor={"#002E6E"}
                    placeholder="Enter pass ***"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </FormControl>

                <Stack spacing={5}>
                  <Stack
                    direction={{ base: "column", sm: "row" }}
                    align={"start"}
                    justify={"space-between"}
                  >
                    <Checkbox>Remember me</Checkbox>
                    {/* <Link color={"blue.400"}>Forgot password?</Link> */}
                    
                  </Stack>

                  <Button
                    type="submit"
                    bg={"blue.500"}
                    color={"white"}
                    _hover={{
                      bg: "blue.600",
                    }}
                    onClick={LoginFunc}
                  >
                    Login
                  </Button>

                  <Box display={"flex"} justifyContent="center">
                    <Text as={"span"} textAlign={"center"}>
                      Dont have Account ?{" "}
                    </Text>
                    <Text color="#002E6E" fontWeight="600" as={"span"}>
                      <Link to={"/register"}>Sign Up</Link>
                    </Text>
                  </Box>
                </Stack>
              </Stack>
            </Box>
          </Stack>
        </Flex>
      </Box>
    </>
  );
};



export default Login