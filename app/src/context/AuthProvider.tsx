import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { jwtDecode } from "jwt-decode";
import { useCookies } from "react-cookie";

import { useGetUserData } from "@/utils/react-query/queries";

interface AuthProviderProps {
  children: ReactNode;
}

interface User {
  _id: string;
  first_name: string;
  last_name: string;
  image_url: string;
  email: string;
  role: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
  isLoading: boolean;
  authUser: User | null;
}

// Create a context for authentication
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Define a custom hook to use the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { mutateAsync: getUserData } = useGetUserData();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["product_rush_token"]);

  const login = (token: string) => {
    setIsLoading(true);
    setCookie("product_rush_token", token, { path: "/" });
    checkToken(token);
  };

  const logout = () => {
    removeCookie("product_rush_token", { path: "/" });
    setAuthUser(null);
    setIsAuthenticated(false);
  };

  const getUser = async (user_id: string) => {
    const response = await getUserData({ user_id });
    if (response.status && response.user) {
      const user = response.user;
      setAuthUser({ ...user });
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  };

  const checkToken = (token: string) => {
    const decodedToken: { exp: number; id: string } = jwtDecode(token);
    const expirationTime = decodedToken.exp * 1000; // Convert to milliseconds
    const currentTime = Date.now();

    if (expirationTime > currentTime) {
      getUser(decodedToken.id);
    } else {
      setIsAuthenticated(false);
      logout();
      setIsLoading(false);
    }
  };

  // Check if user is already authenticated on component mount
  useEffect(() => {
    const token = cookies["product_rush_token"];
    if (token) {
      checkToken(token);
    } else {
      setIsAuthenticated(false);
      setIsLoading(false);
    }
  }, [cookies]);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout, isLoading, authUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
