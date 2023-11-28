import axios from "axios";
import { createContext, useContext } from "react";
// import { ROLES } from "../App";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  // const [currentUser, setCurrentUser] = useState(
  //   JSON.parse(localStorage.getItem("user")) || null
  // );

  const login = async (inputs) => {
    const res = await axios.post("http://localhost:3008/api/auth/login", inputs);
    localStorage.setItem("user", JSON.stringify(res.data.info));
    localStorage.setItem("accessToken", JSON.stringify(res.data.accessToken));
  };

  const logout = async () => {
    await axios.get("http://localhost:3008/api/auth/logout");
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
  };

  // useEffect(() => {
  //   localStorage.setItem("user", JSON.stringify(currentUser));
  //   // console.log("current" + currentUser.name);
  // }, [currentUser]);

  return (
    <AuthContext.Provider value={{ login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext)
}