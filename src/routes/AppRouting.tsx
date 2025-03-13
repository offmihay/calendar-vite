import { Routes, Route, Navigate } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import SignUpPage from "../pages/SignUpPage";
import SignInPage from "../pages/SignInPage";
import HomePage from "../pages/HomePage";

const AppRouting = () => {
  return (
    <Routes>
      <Route path="signin" element={<SignInPage />} />
      <Route path="signup" element={<SignUpPage />} />

      <Route element={<PrivateRoute />}>
        <Route path="home" element={<HomePage />} />
      </Route>

      <Route path="*" element={<Navigate to="/home" />} />
    </Routes>
  );
};

export default AppRouting;
