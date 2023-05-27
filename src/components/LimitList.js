import { useEffect, useState } from "react";
import { DeleteIcon, EditIcon, CloseIcon } from "@chakra-ui/icons";

import {
  Text,
  Box,
  Button,
  useToast,
  HStack,
  Stack,
  Card,
  CardBody,
  Heading,
  Progress,
  VStack,
  CardFooter,
  FormControl,
  Input,
  Spinner,
  Center,
} from "@chakra-ui/react";

import CustomModal from "../modals/customModal";

import http from "../connection/connect";

function LimitList({ triggerAction, setTriggerAction }) {
  const [limits, setLimits] = useState(null);
  const [limit, setLimit] = useState();
  const [selectedItem, setItem] = useState();

  const [error, setError] = useState();
  const [isLoading, setLoading] = useState();

  const [isOpen, setIsOpen] = useState(false);

  // modal handlers
  const openModal = () => setIsOpen(true);
  const closeModal = () => {
    setError("");

    setIsOpen(false);
  };
  const toast = useToast();

  useEffect(() => {
    const getUserLimits = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem("userData"));
        const response = await http.get("/app/limits", {
          headers: { Authorization: `Bearer ${userData?.token}` },
        });

        if (response.status === 200) {
          setLimits(response.data.limits);
        }
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
      getUserLimits();
    }

    if (triggerAction !== false) setTriggerAction(false);
  }, [triggerAction, setTriggerAction, toast, setLimits]);

  const handleDeleteLimit = async (limit_id) => {
    try {
      const response = await http.delete(`/app/limits/${limit_id}`, {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("userData"))?.token
          }`,
        },
      });

      if (response.status === 200) {
        toast({
          title: "Success",
          description: response.data.msg,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
        setTriggerAction(true);
      }
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

  const handleUpdateLimit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await http.patch(
        `/app/limits/${selectedItem._id}`,
        {
          limit: limit,
        },
        {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("userData"))?.token
            }`,
          },
        }
      );
      if (response.status === 200) {
        setLoading(false);
        closeModal();
        toast({
          title: "Success",
          description: response.data.msg,
          status: "info",
          duration: 9000,
          isClosable: true,
        });
        setTriggerAction(true);
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.errorLog
      ) {
        setLoading(false);
        setError(error.response.data.errorLog);
      }
    }
  };

  if (limits === null) {
    return (
      <Center>
        <Spinner emptyColor="gray.200" color="teal" size="md" />
      </Center>
    );
  }

  return (
    <>
      {selectedItem ? (
        <CustomModal
          isOpen={isOpen}
          triggerAction={triggerAction}
          setTriggerAction={setTriggerAction}
          modalHeader={`Update ${selectedItem.label} limit`}
        >
          <form onSubmit={handleUpdateLimit}>
            <FormControl mt={4}>
              <Input
                placeholder="Limit Value"
                type="number"
                value={limit}
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
                loadingText="Updating.."
                colorScheme="teal"
              >
                Update Limit
              </Button>
              <Button
                me={3}
                onClick={closeModal}
                isDisabled={isLoading ? true : false}
                colorScheme="teal"
              >
                Cancel
              </Button>
            </HStack>
          </form>
        </CustomModal>
      ) : null}

      <CardBody w={"100%"}>
        {limits.length > 0 ? (
          <Stack spacing="4">
            {limits.map((limit, index) => {
              const date = new Date(limit.created_at);
              const formattedDate = date.toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
                timeZone: "UTC",
              });
              return (
                <Card
                  key={index}
                  p={3}
                  boxShadow="md"
                  borderRadius="lg"
                  cursor="pointer"
                >
                  <HStack
                    spacing={3}
                    key={index}
                    justifyContent="space-between"
                    alignItems="center"
                    p={2}
                  >
                    <HStack spacing={3}>
                      <Heading as="h6" size="sm">
                        {limit.label}
                      </Heading>
                      <Text
                        color={
                          limit.value / limit.limit > 0.8
                            ? "red.500"
                            : limit.value / limit.limit > 0.5
                            ? "yellow.500"
                            : "green.500"
                        }
                        fontSize="md"
                        fontWeight="bold"
                      >
                        {
                          // take only 2 numbers after the dot
                          Math.round
                            ? Math.round(
                                (limit.value / limit.limit) * 100 * 100
                              ) / 100
                            : (limit.value / limit.limit) * 100
                        }
                        %
                      </Text>
                    </HStack>
                    {limit.limit <= limit.value ? (
                      <Text color="red.500" fontSize="sm" fontWeight="bold">
                        Limit Reached
                      </Text>
                    ) : null}

                    <Box fontSize="sm" fontWeight="bold">
                      <Text>{`Limit : ${limit.limit}`}</Text>
                      <Text>{`Spent : ${limit.value}`}</Text>
                    </Box>
                  </HStack>

                  <Progress
                    colorScheme={
                      limit.value / limit.limit > 0.8
                        ? "red"
                        : limit.value / limit.limit > 0.5
                        ? "yellow"
                        : "green"
                    }
                    size="sm"
                    value={limit.value}
                    max={limit.limit}
                    borderRadius="lg"
                  />

                  <CardFooter
                    p={3}
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Text fontSize="sm" fontWeight="bold">
                      {formattedDate}
                    </Text>
                    <HStack>
                      <Button
                        colorScheme="red"
                        size="sm"
                        variant="outline"
                        onClick={() => handleDeleteLimit(limit._id)}
                      >
                        <DeleteIcon />
                      </Button>
                      <Button
                        colorScheme="teal"
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setItem(limit);
                          setLimit(limit.limit);
                          openModal();
                        }}
                      >
                        <EditIcon />
                      </Button>
                    </HStack>
                  </CardFooter>
                </Card>
              );
            })}
          </Stack>
        ) : (
          <VStack
            color="gray"
            spacing={3}
            justifyContent="center"
            alignItems="center"
            p={5}
          >
            <CloseIcon boxSize="40px" />

            <Text textAlign="center" fontSize="lg" fontWeight="bold">
              No Limits Yet
            </Text>
          </VStack>
        )}
      </CardBody>
    </>
  );
}

export default LimitList;
