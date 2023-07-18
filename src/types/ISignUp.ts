export interface ISignUp {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface IDecodedToken {
    email: string;
    role: string;
    iat: number;
  }
