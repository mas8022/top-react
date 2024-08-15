import React from "react";

const ServerButton = ({ onClick: action }) => {
  return (
    <form action={action}>
      <button
        type="submit"
        className="w-96 h-20 bg-blue-600 rounded-lg flex items-center justify-center text-3xl text-white font-bold"
      >
        click
      </button>
    </form>
  );
};

export {ServerButton};
