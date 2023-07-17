export interface UserType {
  id: number;
  email: string;
  firstname: string;
  lastname: string;
  username: string;
  profilePicture?: string;
  description?: string;
}

export type IFormUserInput = {
  id: number;
  username: string;
  firstname: string;
  lastname: string;
};

export type UserDetailsProps = {
  name: 'username' | 'firstname' | 'lastname';
  title: string;
  value: string | null;
};
