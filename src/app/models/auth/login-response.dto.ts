export interface LoginResponse {
  accessToken: string;
  expiresAt: string; // ISO tarih string
  user: {
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
    isActive: boolean;
    createdDate: string;
    updatedDate: string;
    createdBy: string;
    lastLoginDate: string;
    fullName: string;
    roleId: number;
    roleName: string;
  };
  message: string;
}
