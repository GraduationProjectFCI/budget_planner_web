import { useState, useEffect } from "react";
import {
  Text,
  Box,
  Button,
  Flex,
  Spacer,
  FormControl,
  Input,
  Select,
  useToast,
  HStack,
  Stack,
  Card,
  CardBody,
  Heading,
} from "@chakra-ui/react";

import ProgressbarComponent from "../components/Progressbar";
import http from "../connection/connect";
import Loader from "../components/Loader";

import CustomModal from "../modals/customModal";

const Home = ({ triggerAction, setTriggerAction, labels }) => {
  const toast = useToast();
  //form states
  const [label, setLabel] = useState("");
  const [limit, setLimit] = useState("");

  const [user, setUser] = useState(null);

  //modal state
  const [isOpen, setIsOpen] = useState(false);

  // modal handlers
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const [error, setError] = useState();

  const [isLoading, setLoading] = useState(false);

  const [limits, setLimits] = useState();

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

    const getUserLimits = async () => {
      const userData = JSON.parse(localStorage.getItem("userData"));
      const response = await http.get("/app/limits", {
        headers: { Authorization: `Bearer ${userData?.token}` },
      });
      setLimits(response.data.limits);
    };

    if (!triggerAction) {
      getUserData();
      getUserLimits();
    }

    if (triggerAction !== false) setTriggerAction(false);
  }, [triggerAction, setTriggerAction]);

  if (!user || !limits) return <Loader />;

  const { spent, remaining, total } = user;

  const progressPercentage = (spent / total) * 100;
  const animationDurationInMs = 1500;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formValues = {
      label,
      limit,
    };

    try {
      const response = await http.post("/app/limits", formValues, {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("userData"))?.token
          }`,
        },
      });

      console.log(response);
      if (response.status === 200) {
        setLoading(false);

        toast({
          title: "Success",
          description: response.data.msg,
          status: "success",
          duration: 9000,
          isClosable: true,
        });

        closeModal();
      }
    } catch (error) {
      if (error.response) {
        setLoading(false);
        setError(error.response.data.errorLog);
      } else {
        setLoading(false);
        setError("Something went wrong. Please try again later.");
      }
    }
  };

  console.log(limits);

  return (
    <>
      <CustomModal
        isOpen={isOpen}
        triggerAction={triggerAction}
        setTriggerAction={setTriggerAction}
        modalHeader="Add Limit"
      >
        <form onSubmit={handleSubmit}>
          <Select
            placeholder="Select Label"
            onChange={(e) => {
              setLabel(e.target.value);
            }}
          >
            {labels?.map((label) => (
              <option key={label._id} value={label.label}>
                {label.label}
              </option>
            ))}
          </Select>
          <FormControl mt={4}>
            <Input
              placeholder="Limit Value"
              onChange={(e) => {
                setLimit(e.target.value);
              }}
            />
          </FormControl>

          {error ? (
            typeof err === "string" ? (
              <Box color="red.500" mt={3}>
                {error}
              </Box>
            ) : error.length > 0 ? (
              <Box color="red.500" mt={3} textAlign="center">
                {error.map((error) => {
                  return <p key={error}>{error}</p>;
                })}
              </Box>
            ) : (
              <>
                <Box color="red.500" mt={3} textAlign="center">
                  {error}
                </Box>
              </>
            )
          ) : null}
          <HStack
            mt={5}
            justifyContent="end"
            alignItems="center"
            w="100%"
            p={3}
          >
            <Button
              type="submit"
              isLoading={isLoading}
              loadingText="Adding Limit"
              colorScheme="teal"
            >
              Add Limit
            </Button>
            <Button me={3} onClick={closeModal}>
              Cancel
            </Button>
          </HStack>
        </form>
      </CustomModal>

      <Box>
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

        <Flex p={2} color="black" justifyContent="center" alignItems="center">
          <Text as="span" fontSize="lg" fontWeight="bold" color="black">
            Monthly Limits
          </Text>

          <Spacer />
          <Box>
            <Button
              size="sm"
              onClick={() => {
                openModal();
              }}
            >
              Add Monthly Limit
            </Button>
          </Box>
        </Flex>

        <Card>
          <CardBody>
            <Stack spacing="4">
              {limits.map((limit, index) => {
                return (
                  <Card
                    key={index}
                    p={3}
                    boxShadow="md"
                    _hover="shadow-lg"
                    cursor="pointer"
                    onClick={() => {
                      openModal();
                    }}
                  >
                    <Flex
                      key={index}
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Heading as="h6" size="sm">
                        {limit.label}
                      </Heading>
                      <Text>{limit.createdAt}</Text>
                      <Text>{limit.limit}</Text>
                    </Flex>
                  </Card>
                );
              })}
            </Stack>
          </CardBody>
        </Card>
      </Box>
    </>
  );
};

export default Home;
