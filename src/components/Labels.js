import { useState } from "react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  HStack,
  Button,
  Box,
  FormControl,
  Input,
  Spinner,
  Center,
  useToast,
} from "@chakra-ui/react";

import http from "../connection/connect";

import { AddIcon, DeleteIcon } from "@chakra-ui/icons";

import CustomModal from "../modals/customModal";

const Labels = ({ triggerAction, setTriggerAction, labels }) => {
  const toast = useToast();
  const [error, setError] = useState();
  const [label, setLabel] = useState("");
  const [isLoading, setLoading] = useState();

  const [isOpen, setIsOpen] = useState(false);

  // modal handlers
  const openModal = () => setIsOpen(true);
  const closeModal = () => {
    setError("");

    setIsOpen(false);
  };

  const handleAddingLabel = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await http.post(
        "/app/labels",
        { label },
        {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("userData"))?.token
            }`,
          },
        }
      );

      if (response.status === 200) {
        setTriggerAction(true);
        closeModal();
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.errorLog
      ) {
        setError(error.response.data.errorLog);
      }
    }
  };

  const handleDeleteLabel = async (label_id) => {
    try {
      const response = await http.delete(`/app/labels/${label_id}`, {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("userData"))?.token
          }`,
        },
      });

      if (response.status === 200) {
        toast({
          title: "Label deleted.",
          description: response.data.msg,
          status: "success",
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
          title: "An error occurred.",
          description: error.response.data.errorLog,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
    }
  };

  if (!labels) {
    return (
      <Center>
        <Spinner color="teal.500" size="sm" m={1} />
      </Center>
    );
  }

  return (
    <>
      <CustomModal
        isOpen={isOpen}
        triggerAction={triggerAction}
        setTriggerAction={setTriggerAction}
        modalHeader="Add Label"
      >
        <form onSubmit={handleAddingLabel}>
          <FormControl mt={4}>
            <Input
              placeholder="Label Name"
              type="text"
              onChange={(e) => {
                setLabel(e.target.value);
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
              Add Label
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
      <Menu closeOnSelect={false} placement="bottom">
        <MenuButton as={IconButton} aria-label="Options">
          Labels
        </MenuButton>
        <MenuList>
          <MenuItem onClick={openModal} icon={<AddIcon color="teal.500" />}>
            Add New Label
          </MenuItem>

          {labels.map((label) => {
            return (
              <MenuItem
                key={label._id}
                icon={
                  <DeleteIcon
                    color="red.500"
                    onClick={() => {
                      handleDeleteLabel(label._id);
                    }}
                  />
                }
              >
                {label.label}
              </MenuItem>
            );
          })}
        </MenuList>
      </Menu>
    </>
  );
};

export default Labels;
