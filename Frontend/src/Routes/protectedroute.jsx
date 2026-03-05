import { useContext } from "react";

import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/authprovider";

export function ProtectedRoute({ children }) {
  const { auth } = useContext(AuthContext);

  if (!auth?.token) {
    return <Navigate to="/login" />;
  }

  return children;
}
