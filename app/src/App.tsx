import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CookiesProvider } from "react-cookie";

import "./App.css";
import QueryProvider from "./context/QueryProvider";
import { Toaster } from "./components/ui/toaster";

import { AuthProvider } from "./context/AuthProvider";
import {
  AdminLogin,
  Categories,
  Checkout,
  Dashboard,
  Filters,
  Home,
  MyProfile,
  UserLogin,
} from "./pages";
import ProtectedUserRoutes from "./components/shared/ProtectedRoutes/ProtectedUserRoutes";
import ProtectedAdminRoutes from "./components/shared/ProtectedRoutes/ProtectedAdminRoutes";

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

              <Route element={<ProtectedAdminRoutes />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="/category-filters" element={<Filters />} />
                <Route path="/my-profile" element={<MyProfile />} />
              </Route>

              <Route element={<ProtectedUserRoutes />}>
                <Route path="/checkout" element={<Checkout />} />
              </Route>
            </Routes>
          </AuthProvider>
        </QueryProvider>
      </CookiesProvider>
    </BrowserRouter>
  );
};

export default App;
