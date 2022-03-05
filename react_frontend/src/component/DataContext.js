// import axios from "axios";
import { createContext, useState } from "react";

const DataContext = createContext();

export default DataContext;

export const DataProvider = ({ children }) => {

  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);

  const contextData = {
    data: data,
    setData: setData,
    loading: loading,
    setLoading: setLoading
  };

  return (
    <DataContext.Provider value={contextData}>
      {children}
    </DataContext.Provider>
  );
};
