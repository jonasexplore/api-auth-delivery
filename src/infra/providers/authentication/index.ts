import { CognitoUserPool, CognitoUser } from "amazon-cognito-identity-js";
import {
  CreateUserProps,
  ConfirmUserProps,
  IAuthenticationProvider,
} from "./IAuthentication";

const POOL_DATA = {
  UserPoolId: process.env.AWS_COGNITO_USER_POOL_ID || "",
  ClientId: process.env.AWS_COGNITO_CLIENT_ID || "",
};

export class AuthenticationProvider implements IAuthenticationProvider {
  constructor(private readonly pool = new CognitoUserPool(POOL_DATA)) {}

  async createUser({ email, password }: CreateUserProps): Promise<any> {
    return new Promise((resolve, reject) => {
      this.pool.signUp(email, password, [], [], (err, result) => {
        if (err) {
          console.log(err);
          return reject(err);
        }

        const cognitoUser = result?.user;
        console.log(cognitoUser);

        return resolve({ cognitoUser });
      });
    });
  }

  async confirmUser({ email, code }: ConfirmUserProps): Promise<void> {
    return new Promise((resolve, reject) => {
      const COGNITO_USER = {
        Username: email,
        Pool: this.pool,
      };

      const user = new CognitoUser(COGNITO_USER);

      if (!user) {
        return reject(new Error("User not found"));
      }

      user.confirmRegistration(code, true, (err, result) => {
        if (err) {
          console.log(err);
          return reject(err);
        }

        console.log({ result });

        return resolve(result);
      });
    });
  }
}
