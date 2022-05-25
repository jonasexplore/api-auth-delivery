import { HttpStatusCodes } from "./HttpStatusCode";

export class Exception {
  public readonly message: string;

  public readonly statusCode: number;

  constructor(
    message: string = "Bad request",
    statusCode = HttpStatusCodes.BAD_REQUEST
  ) {
    this.message = message;
    this.statusCode = statusCode;
  }
}
