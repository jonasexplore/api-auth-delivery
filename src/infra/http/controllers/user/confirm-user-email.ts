import { Request, Response } from "express";

import { InvalidFields } from "../../../../modules/user/errors";
import { ConfirmUserEmail } from "../../../../modules/user/use-cases/confirm-email";

export class ConfirmUserEmailController {
  constructor(private readonly confirmUserEmail: ConfirmUserEmail) {}

  async handle(request: Request, response: Response) {
    const { email } = request.body;
    const { code } = request.query as { code: string };

    if (!email || !code) {
      throw new InvalidFields();
    }

    try {
      const confirmedUser = await this.confirmUserEmail.handle({ email, code });
      return response.status(200).json(confirmedUser);
    } catch (error) {
      return response.status(400).json({
        error: true,
        message: error,
        code: 400,
      });
    }
  }
}
