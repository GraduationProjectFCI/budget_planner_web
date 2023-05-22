import { useState, useEffect } from "react";

import {
  Center,
  Text,
  Container,
  Spinner,
  Box,
  Divider,
} from "@chakra-ui/react";
import ProgressbarComponent from "../components/Progressbar";
import http from "../connection/connect";

const Home = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    const getUser = async () => {
      const userData = await localStorage.getItem("userData");
      const userToken = JSON.parse(userData).token;

      const response = await http.get("/app/user-data", {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      setUser(response.data.data);
    };
    getUser();
  }, []);

  if (!user) {
    return (
      <Center>
        <Spinner color="teal.500" size="lg" />
      </Center>
    );
  }

  const progressPercentage = (user.spent / user.total) * 100; // Specify the desired progress percentage here
  const animationDuration = 1500; // Specify the animation duration in milliseconds

  return (
    <div>
      <Container>
        <Box minH="100vh">
          <Center>
            <Box m={15} p={5}>
              <ProgressbarComponent
                percentage={progressPercentage}
                duration={animationDuration}
                details={
                  <Box>
                    <Text fontWeight="bold">{user.spent} Spent </Text>
                    <Text fontWeight="bold">{user.remaining} Remaining </Text>
                    <Text fontWeight="bold">{user.total} Total Budget</Text>
                  </Box>
                }
              />
            </Box>
          </Center>
          <Divider
            orientation="horizontal"
            mb={3}
            w="100%"
            borderColor="blackAlpha.400"
            borderStyle="dashed"
          />
        </Box>
      </Container>
    </div>
  );
};

export default Home;
