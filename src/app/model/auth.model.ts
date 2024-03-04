import { Role } from './role.model';

export interface AuthCredentialModel {
  uid: string;
  email: string;
  role: Role;
  createdAt: Date;
  isBanned: boolean;
}
