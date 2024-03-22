import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CookiesProvider } from "react-cookie";

import "./App.css";
import QueryProvider from "./context/QueryProvider";
import { Toaster } from "./components/ui/toaster";

import { AuthProvider } from "./context/AuthProvider";
import AdminRoot from "./components/shared/layouts/AdminRoot";
import { AdminLogin, Dashboard, Home, UserLogin } from "./pages";
import ProtectedRoutes from "./components/shared/ProtectedRoutes/ProtectedRoutes";

const App = () => {
  return (
    <BrowserRouter>
      <Toaster />
      <CookiesProvider defaultSetOptions={{ path: "/" }}>
        <QueryProvider>
          <AuthProvider>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<UserLogin />} />
              <Route path="/admin-login" element={<AdminLogin />} />

              <Route element={<ProtectedRoutes />}>
                <Route element={<AdminRoot />}>
                  <Route path="/dashboard" element={<Dashboard />} />
                </Route>
              </Route>
            </Routes>
          </AuthProvider>
        </QueryProvider>
      </CookiesProvider>
    </BrowserRouter>
  );
};

export default App;
