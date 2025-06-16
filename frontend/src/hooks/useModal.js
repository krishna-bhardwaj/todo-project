import { useState } from "react";

const useModal = () => {
  const [isOpen, setOpen] = useState();
  const open = () => setOpen((prev) => true);
  const close = () => setOpen((prev) => false);
  return {
    isOpen,
    open,
    close,
  };
};

export default useModal;
