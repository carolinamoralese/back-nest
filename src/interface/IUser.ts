export type Roles = 'admin' | 'user';
export type IUser = {
  id: number;
  name: string;
  email: string;
  password: string;
  age?: number;
  role: Roles;
};
