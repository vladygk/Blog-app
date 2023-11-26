import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginForm from "../containers/LoginForm/LoginForm";
import RegisterForm from "../containers/RegisterForm/RegisterForm";
import Home from "../containers/Home/Home";
import PostCatalog from "../containers/PostCatalog/PostCatalog";
import PostForm from "../containers/PostForm/PostForm";
import UsersCatalog from "../containers/UsersCatalog/UsersCatalog";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/posts" element={<PostCatalog />} />
      <Route path="/posts/create" element={<PostForm />} />
      <Route path="/users" element={<UsersCatalog />} />
    </Routes>
  );
};

export default AppRoutes;
