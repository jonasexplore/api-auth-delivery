import { IAuthenticationProvider } from "../../../infra/providers/authentication/IAuthentication";

type AuthenticateUserProps = {
  email: string;
  password: string;
};

export class AuthenticateUser {
  constructor(
    private readonly authenticationProvider: IAuthenticationProvider
  ) {}
  async handle({ email, password }: AuthenticateUserProps) {
    return this.authenticationProvider.authenticate({
      email,
      password,
    });
  }
}
