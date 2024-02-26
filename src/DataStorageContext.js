// DataStorageContext.js
import React, { createContext, useContext, useState } from 'react';

const DataStorageContext = createContext();

export const DataStorageProvider = ({ children }) => {
  const [jsonData, setJsonData] = useState([]);

  const updateJsonData = (data) => {
    setJsonData(data);
  };

  return (
    <DataStorageContext.Provider value={{ jsonData, updateJsonData }}>
      {children}
    </DataStorageContext.Provider>
  );
};

export const useDataStorage = () => {
  return useContext(DataStorageContext);
};
