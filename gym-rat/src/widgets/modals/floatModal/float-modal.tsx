import { X } from "lucide-react";

interface iFloatModal {
  isOpen: boolean;
  children?: React.ReactNode | string;
  closeModal: () => void;
}

export default function FloatModal({
  children,
  isOpen,
  closeModal,
}: iFloatModal) {
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };
  //

  return (
    <section
      onClick={handleBackdropClick}
      className={
        (isOpen ? "" : " translate-x-full opacity-0 ") +
        " duration-150 box-border fixed top-0 left-0 w-full h-full z-50 flex justify-end items-center py-4 px-4 shadow-lg backdrop-blur-sm"
      }
    >
      <div
        className={
          "bg-zinc-700 w-full rounded-2xl shadow-lg z-50 flex flex-col p-4 h-fit duration-300"
        }
      >
        <X size={24} className={"self-end text-red-400"} onClick={closeModal} />
        {children}
      </div>
    </section>
  );
}
