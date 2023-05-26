import {
  Modal,
  ModalBody,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
} from "@chakra-ui/react";

const CustomModal = ({
  modalHeader,
  children,
  onClose,
  isOpen,
  modalFooter,
}) => {
  return (
    <>
      <Modal
        onClose={onClose}
        isOpen={isOpen}
        closeOnOverlayClick={false}
        size="xl"
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontSize="2xl"
            fontWeight="bold"
            color="black"
            textAlign="center"
            p={3}
            justifyContent="space-between"
          >
            {modalHeader}
          </ModalHeader>

          <ModalBody>{children}</ModalBody>
          <ModalFooter justifyContent="space-between">
            {modalFooter}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CustomModal;
