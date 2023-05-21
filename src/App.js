import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./styles/main.scss";

import Register from "./pages/register";
import Login from "./pages/login";
import ForgetPassword from "./pages/forget-password";
import ChangePassword from "./pages/change-password";
import Home from "./pages/Home";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import Unauthorized from "./pages/unauthorized";
import CheckValidty from "./PrivateRoute/CheckValid";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />

        <Route
          path="/register"
          element={
            <CheckValidty>
              <Register />
            </CheckValidty>
          }
        />
        <Route
          path="/login"
          element={
            <CheckValidty>
              <Login />
            </CheckValidty>
          }
        />
        <Route path="/forgot-password" element={<ForgetPassword />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
