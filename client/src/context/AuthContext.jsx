import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useFetch } from "../hooks/use-fetch";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const { request, loading } = useFetch();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      request({
        url: "/api/profile",
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }).then((res) => {
        if (res.success) {
          setUser(res.data);
        } else {
          toast.error("Please login again");
          setTimeout(() => logout(), 4000);
        }
      });
    }
  }, [token]);

  const register = async (username, email, password) => {
    return await request({
      url: "/api/auth/register",
      method: "POST",
      data: { username, email, password },
    });
  };

  const login = async (email, password) => {
    const res = await request({
      url: "/api/auth/login",
      method: "POST",
      data: { email, password },
    });

    if (res.success) {
      const { token, user } = res.data;

      setToken(token);
      localStorage.setItem("token", token);
      setUser(user);

      navigate("/dashboard", { replace: true });
    }

    return res;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");

    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        register,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
