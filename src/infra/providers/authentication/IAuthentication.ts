export type CreateUserProps = {
  email: string;
  password: string;
};

export type ConfirmUserProps = {
  email: string;
  code: string;
};

export type UserProps = {
  email: string;
  password: string;
};

export type AuthenticateResponse = {
  token: string;
};

export interface IAuthenticationProvider {
  createUser(user: CreateUserProps): Promise<any>;
  confirmUser(user: ConfirmUserProps): Promise<void>;
  authenticate(user: UserProps): Promise<AuthenticateResponse>;
}
