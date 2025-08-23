import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_SERVER_URL;

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchProfile = async () => {
    try {
      if (!token) return;
      setLoading(true);

      const res = await axios.get(`${BASE_URL}/api/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(res.data);
    } catch (error) {
      logout();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [token]);

  const register = async (username, email, password) => {
    setLoading(true);

    try {
      const res = await axios.post(`${BASE_URL}/api/auth/register`, {
        username,
        email,
        password,
      });

      return { success: true, message: res.data.msg };
    } catch (error) {
      console.log(error.response?.data);
      if (error.response?.data?.errors) {
        const errors = Object.values(error.response.data.errors);
        return {
          success: false,
          message: errors.join(", "),
        };
      }
      return {
        success: false,
        message: error.response?.data?.msg || "Registration Failed",
      };
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    setLoading(true);

    try {
      const res = await axios.post(`${BASE_URL}/api/auth/login`, {
        email,
        password,
      });
      const { token, user } = res.data;

      setToken(token);
      localStorage.setItem("token", token);
      setUser(user);

      navigate("/dashboard", { replace: true });
      return { success: true, message: res.data.msg };
    } catch (error) {
      console.log(error.response?.data);
      if (error.response?.data?.errors) {
        const errors = Object.values(error.response.data.errors);
        return {
          success: false,
          message: errors.join(", "),
        };
      }
      return {
        success: false,
        message: error.response?.data?.msg || "Invalid credentials",
      };
    } finally {
      setLoading(false);
    }
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
