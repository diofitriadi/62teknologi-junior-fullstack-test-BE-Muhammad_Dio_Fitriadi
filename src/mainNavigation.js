import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import React from "react";
import PrivateRoute from "./routes/privateRoute";

const MainNavigation = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route
        path="home"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default MainNavigation;