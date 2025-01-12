import React, { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import {jwtDecode} from "jwt-decode";

export const AuthContext = createContext();

const AuthProvider = ({ children, navigate }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser({
          name: decoded.name,
          email: decoded.email,
        });
      } catch (err) {
        console.error("Invalid token", err);
        Cookies.remove("token");
      }
    }
  }, []);

  const login = (respData) => {
    Cookies.set("token", respData.token, { expires: 1 });
    setUser({ name: respData.name, email: respData.email });
  };

  const logout = () => {
    Cookies.remove("token");
    setUser(null);
    setToken(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
