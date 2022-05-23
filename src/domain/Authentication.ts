import { UserProps } from "./User";

export type AuthenticationProps = {
  user: UserProps;
  isAuthenticated: boolean;
};

export abstract class Authentication {
  private props: AuthenticationProps;

  constructor(user: UserProps) {
    this.props = { isAuthenticated: false, user };
  }

  get isAuthenticated() {
    return this.props.isAuthenticated;
  }

  set isAuthenticated(isAuthenticated) {
    this.props.isAuthenticated = isAuthenticated;
  }

  login() {}

  logout() {}
}
