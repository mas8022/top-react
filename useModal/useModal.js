import { useState, useCallback, useEffect } from "react";

const generateKey = () => {
  return `modal-${Date.now()}`;
};

const useModal = () => {
  const getModalKey = () => {
    let key = localStorage.getItem("modalKey");
    if (!key) {
      key = generateKey();
      localStorage.setItem("modalKey", key);
    }
    return key;
  };

  const key = getModalKey();

  const getInitialState = () => {
    const storedState = localStorage.getItem(key);
    return storedState ? JSON.parse(storedState) : false;
  };

  const [isOpen, setIsOpen] = useState(getInitialState);

  const openModal = useCallback(() => setIsOpen(true), []);
  const closeModal = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(isOpen));
  }, [isOpen, key]);

  const Modal = ({ children }) => {
    if (!isOpen) return null;

    const handleClickOutside = (e) => {
      if (e.target.className === "modal-overlay") {
        closeModal();
      }
    };

    const overlayStyles = {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      zIndex: 10000,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    };

    const modalStyles = {
      backgroundColor: "white",
      borderRadius: "10px",
      zIndex: 10001,
      maxWidth: "500px",
    };

    return (
      <div
        className="modal-overlay"
        style={overlayStyles}
        onClick={handleClickOutside}
      >
        <div className="modal-content" style={modalStyles}>
          {children}
        </div>
      </div>
    );
  };

  return {
    openModal,
    closeModal,
    Modal,
  };
};

export { useModal };
