import { createContext, useContext, useEffect, useState } from "react";
import { login, register } from "../services/authService";
import axios from "axios";

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      console.log('Found existing token, verifying...');
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      
      const meUrl = API_BASE_URL 
        ? `${API_BASE_URL}/auth/me`
        : "http://localhost:5001/api/auth/me"; 
        
      axios.get(meUrl)
        .then((res) => {
          console.log('Token verification successful:', res.data);
          const userData = res.data.user || res.data;
          setUser(userData);
        })
        .catch((error) => {
          console.log('Token verification failed:', error);
          setUser(null);
          localStorage.removeItem("token");
          delete axios.defaults.headers.common["Authorization"];
        })
        .finally(() => setLoading(false));
    } else {
      console.log('No token found');
      setLoading(false);
    }
  }, [API_BASE_URL]); 

  const loginUser = async (email, password) => {
    try {
      console.log('AuthContext: Starting login process');
      const data = await login({ email, password });
      console.log('AuthContext: Login response received:', data);
      
      if (!data.token) {
        throw new Error('No token received from server');
      }
      
      let userData;
      if (data.user) {
        userData = data.user;
      } else if (data._id) {
        userData = {
          _id: data._id,
          name: data.name,
          email: data.email,
          role: data.role
        };
      } else {
        throw new Error('No user data received from server');
      }
      
      setUser(userData);
      localStorage.setItem("token", data.token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
      console.log('AuthContext: Login completed successfully, user:', userData);
    } catch (error) {
      console.error('AuthContext: Login failed:', error);
      throw error;
    }
  };

  const registerUser = async ({email, password, name, role}) => {
    try {
      console.log("[DEBUG] Attempting to register user:", { email, name, role });
      console.log("[DEBUG] API_BASE_URL:", API_BASE_URL); // Debug log

      if (!email || !password || !name || !role) {
        throw new Error("Missing required registration fields");
      }

      // Fixed: Remove double response wrapping
      const responseData = await register({ name, email, password, role });
      console.log("[DEBUG] Registration response data:", responseData);

      if (!responseData.token) {
        throw new Error("Authentication token missing in response");
      }

      localStorage.setItem("token", responseData.token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${responseData.token}`;

      // Handle both response formats
      let userData;
      if (responseData.user) {
        userData = responseData.user;
      } else if (responseData._id) {
        userData = {
          _id: responseData._id,
          name: responseData.name,
          email: responseData.email,
          role: responseData.role
        };
      } else {
        throw new Error("No user data received from server");
      }

      if (!userData._id || !userData.email) {
        throw new Error("Incomplete user data received");
      }

      setUser(userData);
      console.log("[SUCCESS] User registered successfully:", userData);

      return userData;

    } catch (error) {
      console.error("[ERROR] Registration failed:", {
        error: error.message,
        response: error.response?.data,
        status: error.response?.status,
        stack: error.stack
      });

      localStorage.removeItem("token");
      delete axios.defaults.headers.common["Authorization"];
      setUser(null);

      throw new Error(
        error.response?.data?.message ||
        error.message ||
        "Registration failed. Please try again."
      );
    }
  };

  const logout = () => {
    console.log('Logging out user');
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loginUser, registerUser, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
