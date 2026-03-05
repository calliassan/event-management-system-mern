import { createContext, useState, useEffect } from "react";

// create context
export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setAuth({ token });
    }
  }, []);

  const login = (data) => {
    localStorage.setItem("token", data.token);
    setAuth({ token: data.token, user: data.user });
  };

  const logout = () => {
    localStorage.removeItem("token");
    setAuth(null);
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
