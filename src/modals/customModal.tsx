import {
  Modal,
  ModalBody,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
} from "@chakra-ui/react";
import { ReactNode } from "react";

interface CustomModalProps {
  modalHeader: string;
  children: ReactNode;
  onClose: () => void;
  isOpen: boolean;
  modalFooter?: ReactNode;
}

const CustomModal: React.FC<CustomModalProps> = ({
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
