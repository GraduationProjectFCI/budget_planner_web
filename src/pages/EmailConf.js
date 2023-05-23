import { React, useEffect, useState } from "react";
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

const MailConfirmation = () => {
  const navigate = useNavigate();
  const toast = useToast();

  const [user_id, setUser_id] = useState(null);
  const [isLoading, setLoading] = useState(false);

  //form state
  const [code, setCode] = useState("");

  //error state
  const [err, setError] = useState("");

  useEffect(() => {
    const resData = JSON.parse(localStorage.getItem("resData"));
    if (resData) {
      setUser_id(resData.user_id);
    }
  }, []);

  if (!user_id) {
    return (
      <AuthWrapper header="Alert">
        <Divider />

        <Center>Type the Confirmation code that sent to your mail</Center>

        <Center mt={3}>
          <Link href="/register" textAlign="center">
            <Button>Back to Register?</Button>
          </Link>
        </Center>
      </AuthWrapper>
    );
  }

  //form values
  const formValues = {
    user_id,
    code,
  };

  //form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await http.post("/auth/confirmation", formValues);

      if (response.data.status === 200) {
        setLoading(false);

        //store the token locally
        await localStorage.setItem("userData", JSON.stringify(response.data));
        toast({
          title: "Mail Confirmed",
          status: "success",
          duration: 9000,
          isClosable: true,
        });

        navigate("/home");
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
      <AuthWrapper header="Confirm Email">
        <Divider />

        <form onSubmit={handleSubmit}>
          <FormControl pt={4}>
            <Center>
              <FormHelperText>
                Type the Confirmation code that sent to your mail
              </FormHelperText>
            </Center>

            <Input
              mt={5}
              placeholder="Confirmation code"
              type="number"
              onChange={(e) => setCode(e.target.value)}
            />

            <Button
              type="submit"
              width="100%"
              textColor="white"
              mt={5}
              isLoading={isLoading}
              loadingText="Loading.."
              colorScheme="teal"
            >
              Confirm
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

export default MailConfirmation;
