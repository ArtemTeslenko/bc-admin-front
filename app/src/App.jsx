import { Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import {
  HomePage,
  StudentsListPage,
  StudentFormPage,
  StudentCreatePage,
  UsersListPage,
  UserFormPage,
  PeriodsListPage,
  RegisterPage,
  LoginPage,
} from "@/assets/pages";
import { getCurrentUser, selectIsgettingCurrent } from "@/assets/redux";
import { Layout } from "@/assets/components/Layout/Layout";
import { PrivateRoute, PublicRoute } from "@/assets/routes";
import { Loader } from "@/assets/components/Loader";

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
    <>
      {!isGettingCurrentUser ? (
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
              path="students/create"
              element={
                <PrivateRoute redirectTo="/login">
                  <StudentCreatePage />
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
                <PrivateRoute
                  redirectTo="/login"
                  requiredRole={["super-admin"]}
                >
                  <UsersListPage />
                </PrivateRoute>
              }
            />
            <Route
              path="users/:id"
              element={
                <PrivateRoute
                  redirectTo="/login"
                  requiredRole={["super-admin"]}
                >
                  <UserFormPage />
                </PrivateRoute>
              }
            />
            <Route
              path="periods"
              element={
                <PrivateRoute
                  redirectTo="/periods"
                  requiredRole={["super-admin", "admin"]}
                >
                  <PeriodsListPage />
                </PrivateRoute>
              }
            />
          </Route>
        </Routes>
      ) : (
        <Loader isLoading={true} />
      )}
    </>
  );
}
