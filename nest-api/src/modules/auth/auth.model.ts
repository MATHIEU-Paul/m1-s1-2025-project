import type { AuthUserId } from './auth.entity';

export type AuthUserModel = {
  id: AuthUserId;
  username: string;
  createdAt: Date;
};

export type AuthSessionModel = {
  token: string;
  user: AuthUserModel;
};
