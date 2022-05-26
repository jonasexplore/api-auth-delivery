import {
  AuthenticationDetails,
  CognitoUserPool,
  CognitoUser,
} from "amazon-cognito-identity-js";
import {
  CreateUserProps,
  ConfirmUserProps,
  IAuthenticationProvider,
  AuthenticateResponse,
  UserProps,
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
          return reject(err);
        }

        const cognitoUser = result?.user;

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

      user.confirmRegistration(code, true, (err, result) => {
        if (err) {
          return reject(err);
        }

        return resolve(result);
      });
    });
  }

  async authenticate({
    email,
    password,
  }: UserProps): Promise<AuthenticateResponse> {
    return new Promise((resolve, reject) => {
      const COGNITO_USER = {
        Username: email,
        Pool: this.pool,
      };

      const user = new CognitoUser(COGNITO_USER);

      const authenticationDetails = new AuthenticationDetails({
        Username: email,
        Password: password,
      });

      user.authenticateUser(authenticationDetails, {
        onSuccess: (result) => {
          return resolve({
            token: result.getIdToken().getJwtToken(),
          });
        },
        onFailure: (err) => {
          return reject(err);
        },
      });
    });
  }
}
