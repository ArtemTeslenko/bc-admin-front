export const controlStyles = (baseStyles, state) => {
  return {
    ...baseStyles,
    fontSize: "16px",
    boxShadow: "inset 0px 0px 10px 1px rgba(0, 0, 0, 0.1)",
    borderRadius: "6px",
    border: "none",
  };
};

export const multiValueStyles = (baseStyles, state) => {
  return { ...baseStyles, backgroundColor: "#e9f9f2", borderRadius: "4px" };
};
