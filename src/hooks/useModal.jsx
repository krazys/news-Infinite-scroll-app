// useModal.js
import { useState } from "react";

export default function useModal(initialState = false) {
  const [isOpen, setIsOpen] = useState(initialState);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return {
    isOpen,
    toggle,
  };
}
