import { IAuthenticationProvider } from "../../../infra/providers/authentication/IAuthentication";

type ConfirmUserProps = {
  email: string;
  code: string;
};

export class ConfirmUserEmail {
  constructor(
    private readonly authenticationProvider: IAuthenticationProvider
  ) {}

  async handle(confirmUser: ConfirmUserProps) {
    return this.authenticationProvider.confirmUser(confirmUser);
  }
}
