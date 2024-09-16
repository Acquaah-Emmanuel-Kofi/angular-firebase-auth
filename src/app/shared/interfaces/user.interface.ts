export interface IUser {
  uid: string;
  email: string;
  displayName?: string;
  photoURL: string;
  emailVerified: boolean;
}

export interface IAuthState {
  user: IUser | null;
  isAuthenticating: boolean;
}

export interface ICredentials {
    email: string;
    password: string;
}