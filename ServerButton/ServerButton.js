"use server";
import React from "react";

const ServerButton = ({ onClick: action, className: classes, children }) => {
  return (
    <form action={action}>
      <button type="submit" className={classes}>
        {children}
      </button>
    </form>
  );
};

export { ServerButton };
