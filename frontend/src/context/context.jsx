import { createContext, useState } from "react";

export const BusinessContext = createContext(null);

export const BusinessProvider = ({ children }) => {
  const [businessData, setBusinessData] = useState(null);

  return (
    <BusinessContext.Provider value={{ businessData, setBusinessData }}>
      {children}
    </BusinessContext.Provider>
  );
};
