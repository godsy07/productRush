import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CookiesProvider } from "react-cookie";

import "./App.css";
import QueryProvider from "./context/QueryProvider";
import { Toaster } from "./components/ui/toaster";
import { AdminLogin, Dashboard, Home, UserLogin } from "./pages";
import ProtectedRoutes from "./components/shared/ProtectedRoutes/ProtectedRoutes";

const App = () => {
  return (
    <BrowserRouter>
      <Toaster />
      <CookiesProvider defaultSetOptions={{ path: "/" }}>
        <QueryProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<UserLogin />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route element={<ProtectedRoutes />}>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
          </Routes>
        </QueryProvider>
      </CookiesProvider>
    </BrowserRouter>
  );
};

export default App;
