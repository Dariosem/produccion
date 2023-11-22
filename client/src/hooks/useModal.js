import { useState } from "react"

export const useModal = (status = false) => {
  const [isOpen, setIsOpen] = useState(status);

  const onOpenModal = () => setIsOpen(true);
  const onCloseModal = () => setIsOpen(false);

  return [isOpen, onOpenModal, onCloseModal];
}