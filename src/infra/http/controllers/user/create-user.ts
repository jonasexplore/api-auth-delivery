import { Request, Response } from "express";

import { InvalidFields } from "../../../../modules/user/errors";
import { CreateUser } from "../../../../modules/user/use-cases/create";

export class CreateUserController {
  constructor(private readonly createUser: CreateUser) {}

  async handle(request: Request, response: Response) {
    const { email, password } = request.body;

    if (!email || !password) {
      throw new InvalidFields();
    }

    try {
      return response
        .status(200)
        .json(this.createUser.handle({ email, password }));
    } catch (error) {
      return response.status(400).json({
        error: true,
        message: error,
        code: 400,
      });
    }
  }
}
