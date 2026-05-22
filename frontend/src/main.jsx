import React from "react";
import ReactDOM from "react-dom/client";

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import { GoogleOAuthProvider } from "@react-oauth/google";

import "./index.css";

import Login from "./views/Login";
import Signup from "./views/Signup";
import Chat from "./views/Chat";
import ProtectedRoute from "./auth/ProtectedRoute";

const GOOGLE_CLIENT_ID =
  "322132309509-6viboq4lqnhda33vmta9t0b0ks2hckfi.apps.googleusercontent.com";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <BrowserRouter>
        <Routes>

          <Route
            path="/"
            element={<Login />}
          />

          <Route
            path="/signup"
            element={<Signup />}
          />

          <Route
            path="/chat"
            element={
              <ProtectedRoute>
                <Chat />
              </ProtectedRoute>
            }
          />

        </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
  </React.StrictMode>
);