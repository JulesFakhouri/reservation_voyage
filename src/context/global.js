import { createContext, useState } from "react";

export const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
  const [modal, setModal] = useState({ open: false, data: "" });
  const [loading, setLoading] = useState(false);

  const globalState = { modal, setModal, loading, setLoading };

  return (
    <GlobalContext.Provider value={globalState}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
