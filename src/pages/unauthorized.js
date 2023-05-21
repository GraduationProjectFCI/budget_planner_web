import React from "react";

import {
  Image,
  Text,
  Box,
  Center,
  HStack,
  Button,
} from "@chakra-ui/react";
import unauthorizedImage from "../assets/Unauthorized.png";

const Unauthorized = () => {
  return (
    <Box
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Center>
        <Box width="35rem">
          <Image src={unauthorizedImage} alt="unauthorized" />
          <Text fontSize="2xl" textAlign="center">
            You are not authorized to view this page. Please login to continue.
          </Text>

          <Center>
            <HStack mt={5}>
              <Button
                onClick={() => {
                  window.location.href = "/login";
                }}
              >
                Login
              </Button>
              <Button
                onClick={() => {
                  window.location.href = "/register";
                }}
              >
                Register
              </Button>
            </HStack>
          </Center>
        </Box>
      </Center>
    </Box>
  );
};

export default Unauthorized;
