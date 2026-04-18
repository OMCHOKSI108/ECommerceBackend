import { http } from "./http";
import type { LoginPayload, LoginResponse, SignupPayload, UserProfile } from "../types/auth";

export const authService = {
  signup: async (payload: SignupPayload): Promise<{ message: string }> => {
    const response = await http.post("/auth/signup", payload);
    return response.data;
  },

  login: async (payload: LoginPayload): Promise<LoginResponse> => {
    const response = await http.post("/auth/login", payload);
    return response.data;
  },

  getProfile: async (): Promise<UserProfile> => {
    const response = await http.get("/user/profile");
    return response.data;
  },

  health: async (): Promise<{ status: string }> => {
    const response = await http.get("/health");
    return response.data;
  }
};
