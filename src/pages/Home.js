import React from "react";
import { Divider, Text, Center, Button, VStack } from "@chakra-ui/react";
import { AuthWrapper } from "../components/AuthWrapper";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <AuthWrapper header="Home">
        <Divider />
        <Center>
          <VStack>
            <Text mt={5} fontSize="lg">
              Welcome to the Home Page
            </Text>
            <Link href="/about">
              <Button m={2}>About</Button>
            </Link>
            <Link href="/contact">
              <Button m={2}>Contact</Button>
            </Link>
          </VStack>
        </Center>
      </AuthWrapper>
    </div>
  );
};

export default Home;
