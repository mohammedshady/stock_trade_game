import { useUserContext } from "./UserContext";

export const useUser = () => {
  const { user, setUser } = useUserContext();

  const updateUser = (id, name) => {
    setUser({ id, name });
    localStorage.setItem("userData", JSON.stringify({ id, name }));
    console.log(id + " " + name);
  };

  return { user, updateUser };
};
