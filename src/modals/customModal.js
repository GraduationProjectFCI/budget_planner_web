import {
  Modal,
  ModalBody,
  ModalOverlay,
  ModalContent,
  ModalHeader,
} from "@chakra-ui/react";

const CustomModal = ({ modalHeader, children, onClose, isOpen }) => {
  return (
    <>
      <Modal onClose={onClose} isOpen={isOpen} closeOnOverlayClick={false}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{modalHeader}</ModalHeader>

          <ModalBody>{children}</ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CustomModal;
