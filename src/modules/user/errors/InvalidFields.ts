import { Exception, HttpStatusCodes } from "../../common/errors";

export class InvalidFields extends Exception {
  constructor() {
    super("Invalid fields", HttpStatusCodes.BAD_REQUEST);
  }
}
