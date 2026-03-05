import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Login } from "./Pages/login";
import { Dashboard } from "./Pages/dashboard";
import Register from "./Pages/register";
import { ProtectedRoute } from "./Routes/protectedroute";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
