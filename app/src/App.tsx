import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CookiesProvider } from "react-cookie";

import "./App.css";
import QueryProvider from "./context/QueryProvider";
import { Toaster } from "./components/ui/toaster";

import { AuthProvider } from "./context/AuthProvider";
import { AdminLogin, Categories, Checkout, Dashboard, Filters, Home, MyProfile, UserLogin } from "./pages";
import AdminRootLayout from "./components/shared/layouts/AdminRootLayout";
import ProtectedRoutes from "./components/shared/ProtectedRoutes/ProtectedRoutes";
import UserRootLayout from "./components/shared/layouts/UserRootLayout";

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
                <Route element={<AdminRootLayout />}>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/categories" element={<Categories />} />
                  <Route path="/category-filters" element={<Filters />} />
                  <Route path="/my-profile" element={<MyProfile />} />
                </Route>
                <Route element={<UserRootLayout />}>
                  <Route path="/checkout" element={<Checkout />} />
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
