import { Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import {
  HomePage,
  StudentsListPage,
  StudentFormPage,
  UsersListPage,
  UserFormPage,
  RegisterPage,
  LoginPage,
} from "@/assets/pages";
import { getCurrentUser } from "@/assets/redux";
import { selectIsgettingCurrent } from "@/assets/redux";
import { Layout } from "@/assets/components/Layout/Layout";
import { PrivateRoute, PublicRoute } from "@/assets/routes";

export default function App() {
  const dispatch = useDispatch();
  const [currentLocation, setCurrentLocation] = useState("/");
  const isGettingCurrentUser = useSelector(selectIsgettingCurrent);

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  useEffect(() => {
    const path = localStorage.getItem("currentPath");
    setCurrentLocation(path ? path : "/");
  }, []);

  return (
    !isGettingCurrentUser && (
      <>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route
              index
              element={
                <PrivateRoute redirectTo="/login">
                  <HomePage />
                </PrivateRoute>
              }
            />
            <Route
              path="register"
              element={
                <PublicRoute restricted redirectTo="/">
                  <RegisterPage />
                </PublicRoute>
              }
            />
            <Route
              path="login"
              element={
                <PublicRoute restricted redirectTo={currentLocation}>
                  <LoginPage />
                </PublicRoute>
              }
            />
            <Route
              path="students"
              element={
                <PrivateRoute redirectTo="/login">
                  <StudentsListPage />
                </PrivateRoute>
              }
            />
            <Route
              path="students/:id"
              element={
                <PrivateRoute redirectTo="/login">
                  <StudentFormPage />
                </PrivateRoute>
              }
            />
            <Route
              path="users"
              element={
                <PrivateRoute redirectTo="/login" requiredRole="super-admin">
                  <UsersListPage />
                </PrivateRoute>
              }
            />
            <Route
              path="users/:id"
              element={
                <PrivateRoute redirectTo="/login" requiredRole="super-admin">
                  <UserFormPage />
                </PrivateRoute>
              }
            />
          </Route>
        </Routes>
      </>
    )
  );
}
