import React, { useCallback, useEffect, useState, ReactNode } from "react";

interface DraggableProps {
  children: ReactNode;
}

interface Position {
  x: number;
  y: number;
}

const Draggable: React.FC<DraggableProps> = ({ children }) => {
  const [dragging, setDragging] = useState<boolean>(false);
  const [startPosition, setStartPosition] = useState<Position>({ x: 0, y: 0 });
  const [currentPosition, setCurrentPosition] = useState<Position>({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    // Retrieve the saved position from localStorage when the component mounts
    const savedPosition = localStorage.getItem("dragPosition");
    if (savedPosition) {
      setCurrentPosition(JSON.parse(savedPosition));
    }
  }, []);

  const onMouseDown = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    setDragging(true);
    setStartPosition({ x: event.clientX, y: event.clientY });
  }, []);

  const onMouseMove = useCallback(
    (event: MouseEvent) => {
      if (dragging) {
        const newPosition: Position = {
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

  const style: React.CSSProperties = {
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
