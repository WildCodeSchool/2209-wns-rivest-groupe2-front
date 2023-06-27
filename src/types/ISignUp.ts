export interface ISignUp {
    email: string;
    password: string;
    confirmPassword: string;
}

export interface IDecodedToken {
    email: string;
    role: string;
    iat: number;
  }