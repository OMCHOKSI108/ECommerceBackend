import { createContext, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { authService } from "../services/auth.service";
import { tokenStorage } from "../services/storage";
import type { LoginPayload, SignupPayload, UserProfile } from "../types/auth";

interface AuthContextValue {
  isAuthenticated: boolean;
  isInitializing: boolean;
  isAuthLoading: boolean;
  user: UserProfile | null;
  login: (payload: LoginPayload) => Promise<void>;
  signup: (payload: SignupPayload) => Promise<void>;
  logout: () => void;
  refreshProfile: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);
  const [isAuthLoading, setIsAuthLoading] = useState(false);

  useEffect(() => {
    const bootstrap = async () => {
      const token = tokenStorage.getToken();

      if (!token) {
        setIsInitializing(false);
        return;
      }

      try {
        const profile = await authService.getProfile();
        setUser(profile);
      } catch (error) {
        tokenStorage.clearToken();
      } finally {
        setIsInitializing(false);
      }
    };

    void bootstrap();
  }, []);

  const login = async (payload: LoginPayload) => {
    setIsAuthLoading(true);

    try {
      const response = await authService.login(payload);
      tokenStorage.setToken(response.token);
      setUser(response.user);
      toast.success("Login successful");
    } catch (error: any) {
      const message = error?.response?.data?.message ?? "Unable to login";
      toast.error(message);
      throw error;
    } finally {
      setIsAuthLoading(false);
    }
  };

  const signup = async (payload: SignupPayload) => {
    setIsAuthLoading(true);

    try {
      await authService.signup(payload);
      toast.success("Account created successfully. Please login.");
    } catch (error: any) {
      const message = error?.response?.data?.message ?? "Unable to create account";
      toast.error(message);
      throw error;
    } finally {
      setIsAuthLoading(false);
    }
  };

  const refreshProfile = async () => {
    try {
      const profile = await authService.getProfile();
      setUser(profile);
    } catch (error) {
      toast.error("Session expired. Please login again.");
      tokenStorage.clearToken();
      setUser(null);
    }
  };

  const logout = () => {
    tokenStorage.clearToken();
    setUser(null);
    toast.success("Logged out");
  };

  const value = useMemo<AuthContextValue>(
    () => ({
      isAuthenticated: Boolean(user),
      isInitializing,
      isAuthLoading,
      user,
      login,
      signup,
      logout,
      refreshProfile
    }),
    [isAuthLoading, isInitializing, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
