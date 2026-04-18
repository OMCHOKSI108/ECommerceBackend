export interface LoginPayload {
  loginId: string;
  password: string;
}

export interface SignupPayload {
  mobile: string;
  email: string;
  password: string;
  fullName: string;
  username: string;
}

export interface UserProfile {
  id: number;
  fullName: string;
  username: string;
  email: string;
  mobile: string;
  createdAt: string;
}

export interface LoginResponse {
  message: string;
  token: string;
  user: UserProfile;
}
