export type UserProps = {
  email: string;
  password: string;
};

export abstract class User {
  private props: UserProps;

  constructor(user: UserProps) {
    this.props = user;
  }

  get email() {
    return this.props.email;
  }

  get password() {
    return this.props.password;
  }

  set email(email: string) {
    this.props.email = email;
  }

  set password(password: string) {
    this.props.password = password;
  }

  async create() {}
  async update() {}
  static async findByEmail(email: string) {}
}
