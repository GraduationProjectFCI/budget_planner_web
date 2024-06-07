import { useState } from "react";
import { AuthWrapper } from "../components/AuthWrapper";
import {
  Box,
  Button,
  Center,
  FormControl,
  Input,
  Link,
  Divider,
  useToast,
} from "@chakra-ui/react";

import { useNavigate } from "react-router-dom";

import http from "../connection/connect";

const Login = () => {
  const toast = useToast();
  const navigate = useNavigate();

  const [isLoading, setLoading] = useState(false);

  //form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //error state
  const [err, setError] = useState("");

  //form values
  const formValues = {
    email,
    password,
  };

  //form submit function
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await http.post("/auth/login", formValues);
      if (response.status === 200) {
        setLoading(false);
        await localStorage.setItem("userData", JSON.stringify(response.data));

        toast({
          title: "Login Successful",
          description: "You have successfully logged in.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        navigate("/home");
      } else {
        setLoading(false);
        setError(response.data.msg);
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
    <AuthWrapper header="Login">
      <Divider />
      <form onSubmit={handleSubmit}>
        <FormControl pt={4}>
          <Input
            mt={5}
            id="email"
            placeholder="Email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            mt={5}
            id="password"
            placeholder="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            isLoading={isLoading}
            loadingText="Loading.."
            colorScheme="teal"
            type="submit"
            width="100%"
            mt={5}
          >
            Login
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
                    return <p key={error}>{error}</p>;
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
          <Center>
            <Link href="/forgot-password">Forgot Password?</Link>
          </Center>
        </FormControl>
      </form>
    </AuthWrapper>
  );
};

export default Login;
