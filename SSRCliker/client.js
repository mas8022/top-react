"use client";
import React from "react";
import { mainFun } from "./server";
const SSRCliker = ({ func, children }) => {


  return (
    <form action={() => mainFun(func)}>
      <button type="submit"> {children} </button>
    </form>
  );
};

export default SSRCliker;
