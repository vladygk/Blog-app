import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginForm from "../containers/LoginForm/LoginForm";
import RegisterForm from "../containers/RegisterForm/RegisterForm";
import Home from "../containers/Home/Home";
import PostCatalog from "../containers/PostCatalog/PostCatalog";
import PostForm from "../containers/PostForm/PostForm";
import UsersCatalog from "../containers/UsersCatalog/UsersCatalog";
import { RouteGuard } from "../utils/RouteGuard";
import ErrorPage from "../containers/ErrorPage/ErrorPage";
import PostDetails from "../components/PostDetails/PostDetails";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginForm/>} />
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/posts" element={<PostCatalog />} />
      <Route path="/posts/create" element={<RouteGuard editMode={false} component={PostForm}/>}/>
      <Route path="/posts/:id/edit" element={<RouteGuard editMode={true} component={PostForm}/>} />
      <Route path="/posts/:id" element={<PostDetails/>} />
      <Route path="/users" element={<UsersCatalog />} />
      <Route path="/error" element={<ErrorPage />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default AppRoutes;
