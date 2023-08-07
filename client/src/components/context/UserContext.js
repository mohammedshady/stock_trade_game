import React, { createContext, useContext, useState } from "react";

const UserContext = createContext();
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    return userData ? userData : { id: null, name: "" };
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
export const useUserContext = () => useContext(UserContext);
