import { useState, useEffect } from "react";
import {
  Text,
  Container,
  Box,
  Divider,
  Button,
  HStack,
  Center,
} from "@chakra-ui/react";

import ProgressbarComponent from "../components/Progressbar";
import http from "../connection/connect";
import Loader from "../components/Loader";

const Home = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem("userData"));
        const response = await http.get("/app/user-data", {
          headers: { Authorization: `Bearer ${userData?.token}` },
        });
        setUser(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    getUserData();
  }, []);

  if (!user) return <Loader />;

  const { spent, remaining, total } = user;

  const progressPercentage = (spent / total) * 100;
  const animationDurationInMs = 1500;

  return (
    <Container>
      <Box mt={5} p={5} boxShadow=" 0px 6px 8px -10px rgba(0,0,0,0.5)">
        <ProgressbarComponent
          percentage={progressPercentage}
          duration={animationDurationInMs}
          details={
            <Text>
              <Text fontWeight="bold">{spent} Spent </Text>
              <Text fontWeight="bold">{remaining} Remaining </Text>
              <Text fontWeight="bold">{total} Total Budget</Text>
            </Text>
          }
        />
      </Box>

      <Center>
        <Box p={10}>
          <HStack>
            <Button>Add Import Sheet</Button>
            <Button>Add Export Sheet</Button>
          </HStack>
        </Box>
      </Center>
    </Container>
  );
};

export default Home;
