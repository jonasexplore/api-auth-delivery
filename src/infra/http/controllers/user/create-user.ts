import { Request, Response } from "express";
import { CreateUser } from "../../../../modules/user/use-cases/create";

export class CreateUserController {
  constructor(private readonly createUser: CreateUser) {}

  async handle(request: Request, response: Response) {
    const { email, password } = request.body;

    if (!email || !password) {
      return response.status(400).json({
        error: true,
        message: "invalid fields",
        code: 400,
      });
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
