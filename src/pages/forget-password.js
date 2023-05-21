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
} from "@chakra-ui/react";

import http from "../connection/connect";
import ConfModal from "../modals/conf_modal";

const ForgotPassword = () => {
  //modal state
  const [showModal, setShowModal] = useState(false);

  //modal functions
  const openModal = () => setShowModal(true); //open modal
  const closeModal = () => setShowModal(false); //close modal

  //form state
  const [email, setEmail] = useState("");

  //error state
  const [err, setError] = useState("");

  //success message state
  const [successMessage, setSuccessMessage] = useState("");

  //form values
  const formValues = {
    email,
  };

  //form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await http.post("api/auth/forgot-password", formValues);

      if (response.data.status === 200) {
        await setSuccessMessage(response.data.message);
        openModal();
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again later.");
      }
    }
  };

  return (
    <>
      <ConfModal
        show={showModal}
        onClose={closeModal}
        modalHeader="Forgot Password"
        modalMessage={successMessage}
      />

      <AuthWrapper header="Forgot Password">
        <Divider />

        <form onSubmit={handleSubmit}>
          <FormControl pt={4}>
            <FormHelperText>
              Forgotten your password? Enter your e-mail address below, and
              we'll send you an e-mail allowing you to reset it.
            </FormHelperText>

            <Input
              mt={5}
              placeholder="Email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />

            <Button type="submit" width="100%" textColor="white" mt={5}>
              Reset my password
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
