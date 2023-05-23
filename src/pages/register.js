import { React, useState } from "react";
import { AuthWrapper } from "../components/AuthWrapper";

import {
  Box,
  Button,
  Center,
  Divider,
  FormControl,
  Input,
  Link,
  HStack,
} from "@chakra-ui/react";

import { useToast } from "@chakra-ui/react";

import http from "../connection/connect";
import { Select } from "@chakra-ui/select";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const toast = useToast();
  const navigate = useNavigate();

  const [isLoading, setLoading] = useState(false);

  //form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [budget, setBudget] = useState("");
  const [birthdate, setBirthDate] = useState("");
  const [currency, setCurrency] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  //password and confirmPassword match
  var isMatch = password !== confirmPassword;

  //error state
  const [err, setErr] = useState("");

  //form values
  const formValues = {
    name,
    email,
    gender,
    budget,
    birthdate,
    currency,
    password,
  };

  //form submit function
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErr("");

    if (!isMatch) {
      try {
        const response = await http.post("/auth/register", formValues);

        if (response.status === 200) {
          setLoading(false);
          await localStorage.setItem("resData", JSON.stringify(response.data));

          toast({
            title: "Account created.",
            description: "We've created your account for you.",
            status: "success",
            duration: 9000,
            isClosable: true,
          });

          navigate("/confirm-email");
        }
      } catch (error) {
        if (error.response) {
          setLoading(false);
          setErr(error.response.data.msg);
        } else {
          setLoading(false);
          setErr("Something went wrong. Please try again later.");
        }
      }
    }
  };

  return (
    <>
      <AuthWrapper header="Register">
        <Divider />
        <form onSubmit={handleSubmit}>
          <FormControl mt={4}>
            <Input
              id="name"
              placeholder="Name"
              type="text"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />

            <Input
              mt={5}
              id="email"
              placeholder="Email"
              type="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />

            <HStack mt={5}>
              <Select
                id="role"
                placeholder="Gender"
                type="text"
                onChange={(e) => {
                  setGender(e.target.value);
                }}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </Select>
              <Input
                id="budget"
                placeholder="Budget"
                type="Number"
                onChange={(e) => {
                  setBudget(e.target.value);
                }}
              />
            </HStack>

            <HStack mt={5}>
              <Input
                id="birthDate"
                placeholder="Birth Date"
                type="date"
                onChange={(e) => {
                  setBirthDate(e.target.value);
                }}
              />
              <Input
                id="currency"
                placeholder="Currency"
                type="text"
                onChange={(e) => {
                  setCurrency(e.target.value);
                }}
              />
            </HStack>

            <Input
              mt={5}
              id="password"
              placeholder="Password"
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />

            <Input
              mt={5}
              id="confirmPassword"
              placeholder="Confirm Password"
              type="password"
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
            />

            <Box mb={3} color="red.500">
              {isMatch ? "Passwords do not match" : null}
            </Box>

            <Center>
              <Button
                isLoading={isLoading}
                loadingText="Loading.."
                colorScheme="teal"
                type="submit"
                width="100%"
                textColor="white"
              >
                Register
              </Button>
            </Center>
            <Center>
              {typeof err === "string" ? (
                <Box color="red.500" mt={3}>
                  {err}
                </Box>
              ) : (
                err.length > 0 && (
                  <Box color="red.500" mt={3} textAlign="center">
                    {err.map((error) => {
                      return <p>{error}</p>;
                    })}
                  </Box>
                )
              )}
            </Center>
            <Center mt={3}>
              <Link href="/login" textAlign="center">
                Have an account? Loign
              </Link>
            </Center>
          </FormControl>
        </form>
      </AuthWrapper>
    </>
  );
};

export default Register;
