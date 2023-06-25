import React, { createContext, useState } from "react";

// Create a new context
export const DataContext = createContext();

// Create a provider component
export const DataProvider = ({ children }) => {
  // State to hold the shared data
  const [data, setData] = useState("Section");
  const [power, setPower] = useState(true);
  const [blank, setBlank] = useState(false);

  // Function to update the shared data
  const updateData = (newData) => {
    setData(newData);
  };
  const updateOpenOne = (newData) => {
    setPower(newData);
  };
  const updateOpenTwo = (newData) => {
    setBlank(newData);
  };

  // Provide the shared data and update function to the child components
  return (
    <DataContext.Provider
      value={{
        data,
        power,
        blank,
        updateOpenOne,
        updateOpenTwo,
        updateData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
