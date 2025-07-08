export interface User {
  id: string;
  email: string;
  username: string;
  fullName: string;
  createdAt: string;
  role: 'user' | 'admin';
  status: 'active' | 'inactive';
  lastLogin?: string;
} 