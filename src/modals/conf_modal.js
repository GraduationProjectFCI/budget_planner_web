import {
  Button,
  Modal,
  ModalBody,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
} from "@chakra-ui/react";

const ConfModal = (props) => {
  return (
    <>
      <Modal
        onClose={props.onClose}
        isOpen={props.show}
        isCentered
        closeOnOverlayClick={false}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{props.modalHeader}</ModalHeader>

          <ModalBody>{props.modalMessage}</ModalBody>
          <ModalFooter>
            <Button
              m={3}
              onClick={() => {
                window.location.href = "/login";
              }}
            >
              Go to Login
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ConfModal;
