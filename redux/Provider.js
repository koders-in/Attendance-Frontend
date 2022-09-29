import React, { createContext, useContext, useReducer } from "react";

import attendanceReducer, { initialState } from "./reducer";

const DataLayer = createContext();

export default function DataProviderLayer({ children }) {
  const [state, dispatch] = useReducer(attendanceReducer, initialState);
  return (
    <DataLayer.Provider value={{ state, dispatch }}>
      {children}
    </DataLayer.Provider>
  );
}

export const useStore = () => useContext(DataLayer);
