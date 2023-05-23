import { React, useState } from "react";
import { AuthWrapper } from "../components/AuthWrapper";
import {
  Box,
  Button,
  Center,
  FormControl,
  Input,
  Link,
  Divider,
  FormHelperText,
  useToast,
} from "@chakra-ui/react";

import { useNavigate } from "react-router-dom";

import http from "../connection/connect";

const ForgotPassword = () => {
  const toast = useToast();
  const [isLoading, setLoading] = useState(false);

  const navigate = useNavigate();

  //form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  var isMatch = password !== confirmPassword;
  //error state
  const [err, setError] = useState("");

  //form values
  const formValues = {
    email,
    password,
  };

  //form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await http.post("/auth/forget-password", formValues);

      if (response.status === 200) {
        setLoading(false);
        toast({
          title: "Success",
          description: response.data.msg,
          status: "success",
          duration: 9000,
          isClosable: true,
        });

        navigate("/login");
      }
    } catch (error) {
      if (error.response) {
        setLoading(false);
        setError(error.response.data.msg);
      } else {
        setLoading(false);
        setError("Something went wrong. Please try again later.");
      }
    }
  };

  return (
    <>
      <AuthWrapper header="Forgot Password">
        <Divider />

        <form onSubmit={handleSubmit}>
          <FormControl pt={4}>
            <Center>
              <FormHelperText>
                Forgotten your password? Enter your e-mail address below, and
                your new password
              </FormHelperText>
            </Center>

            <Input
              mt={5}
              placeholder="Email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />

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

            <Button
              type="submit"
              width="100%"
              textColor="white"
              mt={5}
              isLoading={isLoading}
              loadingText="Loading.."
              colorScheme="teal"
            >
              Reset password
            </Button>

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
              <Link href="/register" textAlign="center">
                Don't have an account? Register
              </Link>
            </Center>
            <Center mt={3}>
              <Link href="/login" textAlign="center">
                Back to Login?
              </Link>
            </Center>
          </FormControl>
        </form>
      </AuthWrapper>
    </>
  );
};

export default ForgotPassword;
