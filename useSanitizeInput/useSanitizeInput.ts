const useSanitizeInput = (value: string): string => {
  const temp = document.createElement("div");
  temp.textContent = value;
  const sanitizedValue = temp.innerHTML;
  temp.remove();
  return sanitizedValue;
};

export { useSanitizeInput };
