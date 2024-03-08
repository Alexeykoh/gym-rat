import { ModalContext } from "@/lib/context/modal-context";
import { ReactNode, useState } from "react";
import FloatModal from "./float-modal";
interface iUseModal {
  children?: ReactNode;
}

export default function useModal({ children }: iUseModal) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  function openModal() {

    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }

  return {
    modalElement: (
      <ModalContext.Provider value={{ closeModal }}>
        <FloatModal isOpen={isOpen} closeModal={closeModal}>
          {children}
        </FloatModal>
      </ModalContext.Provider>
    ),
    openModal,
    closeModal,
  };
}
