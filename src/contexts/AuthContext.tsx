
import { createContext, useContext, useState, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // This is a mock login - we'll replace it with Supabase later
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful login
      setUser({
        id: "1",
        email,
        name: "Test User"
      });
      
      toast({
        title: "Welcome back!",
        description: "You have successfully logged in."
      });
      
      navigate("/dashboard");
    } catch (error) {
      toast({
        title: "Error",
        description: "Invalid credentials",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
