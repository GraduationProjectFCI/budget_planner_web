import { useState, useEffect } from "react";

import {
  Box,
  VStack,
  Flex,
  Text,
  useToast,
  Center,
  Card,
  CardBody,
  Spinner,
} from "@chakra-ui/react";

import http from "../connection/connect";

import { ArrowDownIcon, ArrowUpIcon, DeleteIcon } from "@chakra-ui/icons";

const SheetList = ({ triggerAction, setTriggerAction, user }) => {
  const toast = useToast();
  const [sheets, setSheets] = useState(null);

  useEffect(() => {
    const getUserSheets = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem("userData"));
        const response = await http.get("/app/sheets", {
          headers: { Authorization: `Bearer ${userData?.token}` },
        });

        if (response.status === 200) {
          setSheets(response.data.data);
          toast({
            title: "Success",
            description: "Sheets fetched successfully.",
            status: "success",
            duration: 9000,
            isClosable: true,
          });
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

    if (!triggerAction) getUserSheets();

    if (triggerAction !== false) setTriggerAction(false);
  }, [triggerAction, setTriggerAction, toast]);

  const handleSheetDelete = async (sheet_id) => {
    try {
      const userData = JSON.parse(localStorage.getItem("userData"));
      const response = await http.delete(`/app/sheets/${sheet_id}`, {
        headers: { Authorization: `Bearer ${userData?.token}` },
      });

      if (response.status === 200) {
        setTriggerAction(true);
        toast({
          title: "Success",
          description: "Sheet deleted successfully.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
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

  if (!sheets || !user) {
    return (
      <Center pt={4}>
        <Spinner emptyColor="gray.200" color="teal" size="md" />
      </Center>
    );
  }

  return (
    <Box>
      {sheets.length > 0 ? (
        <VStack spacing={4} align="center" justify="center" p={4}>
          {sheets.map((sheet) => {
            const date = new Date(sheet.created_at);
            const formattedDate = date.toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "numeric",
              minute: "numeric",
              timeZone: "UTC",
            });

            return (
              <Card key={sheet._id} w={"100%"} size={"lg"}>
                <CardBody>
                  <Flex justifyContent="space-between" alignItems="center">
                    <Box>
                      {sheet.sheet_type === "export" ? (
                        <ArrowUpIcon color="green.500" />
                      ) : (
                        <ArrowDownIcon color="red.500" />
                      )}
                      <Text as={"span"} fontSize="lg" fontWeight="bold" ps={3}>
                        {sheet.sheet_type}
                      </Text>
                    </Box>
                    <Text fontWeight="bold">{formattedDate}</Text>

                    <Box>
                      <Text fontSize="lg" fontWeight="bold" as={"span"} pe={3}>
                        {`${sheet.value} 
                    ${user.currency}`}
                      </Text>
                      <DeleteIcon
                        color="red.500"
                        cursor="pointer"
                        onClick={() => {
                          handleSheetDelete(sheet._id);
                        }}
                      />
                    </Box>
                  </Flex>
                </CardBody>
              </Card>
            );
          })}
        </VStack>
      ) : (
        <Center>
          <Text fontSize="lg" fontWeight="bold" as={"span"} p={5}>
            No sheets found.
          </Text>
        </Center>
      )}
    </Box>
  );
};

export default SheetList;
