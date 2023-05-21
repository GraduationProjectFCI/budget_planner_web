import { React, useState } from "react";
import { AuthWrapper } from "../components/AuthWrapper";
import {
  Box,
  FormControl,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Divider,
  FormHelperText,
  Center,
  Link,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

import http from "../connection/connect";
import ConfModal from "../modals/conf_modal";

const ChangePassword = () => {
  //modal state
  const [showModal, setShowModal] = useState(false);

  //modal functions
  const openModal = () => setShowModal(true); //open modal
  const closeModal = () => setShowModal(false); //  close modal

  //form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  //password visibility
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  //password and confirmPassword visibility functions
  const handleIconClick = () => setShowPassword(!showPassword);
  const handleConfirmIconClick = () =>
    setShowConfirmPassword(!showConfirmPassword);

  //password and confirmPassword match
  var isMatch = password !== confirmPassword;

  //error state
  const [err, setError] = useState("");

  //success message state
  const [successMessage, setSuccessMessage] = useState("");

  //form values
  const formValues = {
    email,
    password,
  };

  //form submit function
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await http.post("api/auth/change-password", formValues, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

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
        setError(error.message);
      }
    }
  };

  return (
    <>
      <ConfModal
        show={showModal}
        onClose={closeModal}
        modalHeader="Change Password"
        modalMessage={successMessage}
      />
      ;
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
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />

            <InputGroup mt={5}>
              <Input
                placeholder="Password"
                type={showPassword ? "text" : "password"}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <InputRightElement
                children={
                  showPassword ? (
                    <ViewOffIcon
                      onClick={() => {
                        handleIconClick();
                      }}
                    />
                  ) : (
                    <ViewIcon
                      onClick={() => {
                        handleIconClick();
                      }}
                    />
                  )
                }
              />
            </InputGroup>

            <InputGroup mt={5}>
              <Input
                placeholder="Confirm Password"
                type={showConfirmPassword ? "text" : "password"}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
              />

              <InputRightElement
                children={
                  showConfirmPassword ? (
                    <ViewOffIcon
                      onClick={() => {
                        handleConfirmIconClick();
                      }}
                    />
                  ) : (
                    <ViewIcon
                      onClick={() => {
                        handleConfirmIconClick();
                      }}
                    />
                  )
                }
              />
            </InputGroup>

            <Box mb={3} color="red.500">
              {isMatch ? "Passwords do not match" : null}
            </Box>

            <Button type="submit" width="100%" textColor="white" mt={5}>
              Change Password
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
                Have an account? Loign
              </Link>
            </Center>
          </FormControl>
        </form>
      </AuthWrapper>
    </>
  );
};

export default ChangePassword;
