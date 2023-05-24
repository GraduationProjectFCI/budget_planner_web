import { Button, HStack, useToast, Box } from "@chakra-ui/react";

import http from "../connection/connect";
import SheetList from "../components/SheetList";

const Sheets = ({ triggerAction, setTriggerAction, user }) => {
  const toast = useToast();

  const handleAddingSheet = async (sheetType) => {
    try {
      const userData = JSON.parse(localStorage.getItem("userData"));
      const response = await http.post(
        "/app/sheets",
        {
          sheet_type: sheetType,
        },
        {
          headers: { Authorization: `Bearer ${userData?.token}` },
        }
      );

      if (response.status === 200) {
        setTriggerAction(true);
        toast({
          title: "Success",
          description: response.data.msg,
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

  return (
    <Box>
      <HStack spacing={4} align="center" justify="center" p={4}>
        <Button
          onClick={() => {
            handleAddingSheet("export");
          }}
        >
          Add Export Sheet
        </Button>
        <Button
          onClick={() => {
            handleAddingSheet("import");
          }}
        >
          Add Import Sheet
        </Button>
      </HStack>

      <SheetList
        triggerAction={triggerAction}
        setTriggerAction={setTriggerAction}
        user={user}
      />
    </Box>
  );
};

export default Sheets;
