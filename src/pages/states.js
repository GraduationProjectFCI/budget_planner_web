import { useState, useEffect } from "react";

import {
  useToast,
  Box,
  Text,
  Center,
  Spinner,
  Card,
  CardBody,
} from "@chakra-ui/react";

import http from "../connection/connect";

import StatesList from "../components/StatesList";

const States = ({ triggerAction, setTriggerAction, user }) => {
  const toast = useToast();
  const [userData, setUserData] = useState();

  useEffect(() => {
    const getUserData = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem("userData"));

        const response = await http.get("/app/user-data", {
          headers: { Authorization: `Bearer ${userData?.token}` },
        });
        setUserData(response.data.data);
      } catch (error) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.errorLog
        ) {
          toast({
            title: "Error",
            description: error.response.data.errorLog,
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        }
      }
    };
    if (!triggerAction) {
      getUserData();
    }

    if (triggerAction !== false) setTriggerAction(false);
  }, [setTriggerAction, toast, triggerAction]);

  return (
    <>
      <Card mt={4} boxShadow="lg" bg={"rgb(0,0,0,0.09)"}>
        {user && userData ? (
          <CardBody p={8}>
            <Text fontWeight="bold" fontSize={"2xl"}>
              Here is your data :)
            </Text>

            <Box>
              <Text as={"span"} fontWeight="bold" fontSize={"5xl"}>
                {userData?.spent}
              </Text>

              <Text as={"span"} fontWeight="bold" fontSize={"xl"} p={3}>
                Spent Budget
              </Text>
            </Box>

            <Box>
              <Text as={"span"} fontWeight="bold" fontSize={"xl"} pt={3}>
                {userData.remaining} {user.currency}
              </Text>
              <Text as={"span"} fontSize={"lg"} p={3}>
                Remaining Budget
              </Text>
            </Box>
            <Box>
              <Text as={"span"} fontWeight="bold" fontSize={"xl"} pt={3}>
                {userData.total} {""} {user.currency}
              </Text>
              <Text as={"span"} fontSize={"lg"} p={3}>
                total Budget
              </Text>
            </Box>
          </CardBody>
        ) : (
          <Center>
            <Spinner color="teal.500" size="md" m={8} />
          </Center>
        )}
      </Card>
      <StatesList
        triggerAction={triggerAction}
        setTriggerAction={setTriggerAction}
      />
    </>
  );
};

export default States;
