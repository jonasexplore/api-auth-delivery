import { Request, Response } from "express";

import { InvalidFields } from "../../../../modules/user/errors";
import { AuthenticateUser } from "../../../../modules/user/use-cases";

export class AuthenticateUserController {
  constructor(private readonly authenticateUser: AuthenticateUser) {}

  async handle(request: Request, response: Response) {
    try {
      const { email, password } = request.body;

      if (!email || !password) {
        throw new InvalidFields();
      }

      const data = await this.authenticateUser.handle({ email, password });

      return response.status(200).json(data);
    } catch (error) {
      return response.status(404).json({
        error: true,
        message: error,
        code: 404,
      });
    }
  }
}
