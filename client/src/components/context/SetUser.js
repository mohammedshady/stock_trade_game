import { useUserContext } from "./UserContext";
import { useEffect } from "react";

export const useUser = () => {
  const { user, setUser } = useUserContext();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (userData && userData.id && userData.name) {
      setUser(userData);
    }
  }, [setUser]);

  const updateUser = (id, name) => {
    setUser({ id, name });
    localStorage.setItem("userData", JSON.stringify({ id, name }));
    console.log(id + " " + name);
  };

  return { user, updateUser };
};
