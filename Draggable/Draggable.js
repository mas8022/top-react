import React, { useCallback, useEffect, useState } from "react";

const Draggable = ({ children }) => {
  const [dragging, setDragging] = useState(false);
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });
  const [currentPosition, setCurrentPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Retrieve the saved position from localStorage when the component mounts
    const savedPosition = JSON.parse(localStorage.getItem("dragPosition"));
    if (savedPosition) {
      setCurrentPosition(savedPosition);
    }
  }, []);

  const onMouseDown = useCallback((event) => {
    setDragging(true);
    setStartPosition({ x: event.clientX, y: event.clientY });
  }, []);

  const onMouseMove = useCallback(
    (event) => {
      if (dragging) {
        const newPosition = {
          x: currentPosition.x + (event.clientX - startPosition.x),
          y: currentPosition.y + (event.clientY - startPosition.y),
        };
        setCurrentPosition(newPosition);
        setStartPosition({ x: event.clientX, y: event.clientY });
        // Save the new position to localStorage
        localStorage.setItem("dragPosition", JSON.stringify(newPosition));
      }
    },
    [dragging, startPosition, currentPosition]
  );

  const onMouseUp = useCallback(() => {
    if (dragging) {
      setDragging(false);
    }
  }, [dragging]);

  useEffect(() => {
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };
  }, [onMouseMove, onMouseUp]);

  const style = {
    position: "absolute",
    left: `${currentPosition.x}px`,
    top: `${currentPosition.y}px`,
    cursor: dragging ? "grabbing" : "grab",
    transition: dragging ? "none" : "top 0.1s, left 0.1s",
  };

  return (
    <div style={style} onMouseDown={onMouseDown}>
      {children}
    </div>
  );
};

export { Draggable };
