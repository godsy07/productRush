import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import QueryProvider from "./context/QueryProvider";
import HomePage from "./pages/HomePage/HomePage";
import AdminLoginPage from "./pages/AdminLoginPage/AdminLoginPage";

const App = () => {
  return (
    <BrowserRouter>
    <QueryProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin-login" element={<AdminLoginPage />} />
      </Routes>
    </QueryProvider>
    </BrowserRouter>
  );
};

export default App;
