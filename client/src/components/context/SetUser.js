import { useUserContext } from "./UserContext";

export const useUser = () => {
  const { user, setUser } = useUserContext();

  const updateUser = (id, name) => {
    const updatedUser = { id, name };
    setUser(updatedUser);
    localStorage.setItem("userData", JSON.stringify(updatedUser));
    console.log(id + " " + name);
  };

  return { user, updateUser };
};
