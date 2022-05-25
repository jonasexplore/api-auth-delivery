import { IAuthenticationProvider } from "../../../infra/providers/authentication/IAuthentication";

type CreateUserProps = {
  email: string;
  password: string;
};

export class CreateUser {
  constructor(
    private readonly authenticationProvider: IAuthenticationProvider
  ) {}

  async handle({ email, password }: CreateUserProps): Promise<void> {
    this.authenticationProvider.createUser({
      email,
      password,
    });
  }
}
