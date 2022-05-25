import { NextFunction, Request, Response } from "express";

import { Exception, HttpStatusCodes } from "../../../modules/common/errors";

export function interceptorExceptions(
  error: Error,
  request: Request,
  response: Response,
  _next: NextFunction
): Response {
  if (error instanceof Exception) {
    return response.status(error.statusCode).json({ message: error.message });
  }

  return response
    .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
    .json({ message: error.message });
}
