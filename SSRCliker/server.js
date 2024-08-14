"use server";
export const mainFun = (func = () => {}) => {
  const newFunc = new Function(`return ${func}`)();
  newFunc();
};
