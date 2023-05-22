import React from "react";
import { Divider, Text, Center, Button, VStack } from "@chakra-ui/react";
import { AuthWrapper } from "../components/AuthWrapper";
import { useNavigate } from "react-router-dom";

const CheckValidty = ({ children }) => {
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("userData"));
  return (
    <div>
      {userData ? (
        <AuthWrapper header="Alert">
          <Divider />
          <Center>
            <VStack>
              <Text mt={5} fontSize="lg" color="red.500">
                You are already logged in.
              </Text>

              <Button
                onClick={() => {
                  navigate("/home");
                }}
              >
                Back to Home
              </Button>
            </VStack>
          </Center>
        </AuthWrapper>
      ) : (
        children
      )}
    </div>
  );
};

export default CheckValidty;
