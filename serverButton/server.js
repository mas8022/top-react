import React from "react";

const ServerButton = ({ onClick: action, children }) => {
  return (
    <form action={action}>
      <button type="submit">{children}</button>
    </form>
  );
};

export { ServerButton };
