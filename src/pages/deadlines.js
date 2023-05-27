import DeadlineList from "../components/DeadlinesList";
import { useToast } from "@chakra-ui/react";
import { useState } from "react";
import { Button, HStack, Box, Center, Input } from "@chakra-ui/react";
import http from "../connection/connect";

import CustomModal from "../modals/customModal";

const Deadlins = ({ triggerAction, setTriggerAction, user }) => {
  const toast = useToast();

  //form state
  const [deadline_name, setName] = useState();
  const [deadline_date, setDate] = useState();
  const [deadline_value, setValue] = useState();

  const [error, setError] = useState();
  const [isLoading, setLoading] = useState();

  const [isOpen, setIsOpen] = useState(false);

  // modal handlers
  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setError("");
    setIsOpen(false);
  };

  const handleAddingDeadline = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const userData = JSON.parse(localStorage.getItem("userData"));

    const formValues = {
      deadline_name,
      deadline_date,
      deadline_value,
    };

    try {
      const response = await http.post("/app/deadlines", formValues, {
        headers: { Authorization: `Bearer ${userData?.token}` },
      });

      if (response.status === 200) {
        setLoading(false);
        setTriggerAction(true);
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

  return (
    <>
      <CustomModal
        isOpen={isOpen}
        triggerAction={triggerAction}
        setTriggerAction={setTriggerAction}
        modalHeader="Add Expenses"
      >
        <Box>
          <form
            onSubmit={handleAddingDeadline}
            style={{ display: "flex", flexDirection: "column" }}
          >
            <HStack mb={3}>
              <Input
                placeholder="Deadline Date"
                type="datetime-local"
                onChange={(e) => setDate(e.target.value)}
              />
              <Input
                placeholder="Deadline Value"
                type="number"
                onChange={(e) => setValue(e.target.value)}
              />
            </HStack>

            <Input
              placeholder="Deadline Name"
              type="text"
              onChange={(e) => setName(e.target.value)}
            />

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
                loadingText={"Adding Deadline..."}
                colorScheme="teal"
              >
                Add Deadline
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
        </Box>
      </CustomModal>
      <Box mt={4} p={8}>
        <Center>
          <Button onClick={openModal}>Add deadline</Button>
        </Center>

        <DeadlineList
          triggerAction={triggerAction}
          setTriggerAction={setTriggerAction}
          user={user}
        />
      </Box>
    </>
  );
};

export default Deadlins;
