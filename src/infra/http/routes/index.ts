import { Router } from "express";

import { AuthenticateUser } from "../../../modules/user/use-cases";
import { ConfirmUserEmail } from "../../../modules/user/use-cases/confirm-email";
import { CreateUser } from "../../../modules/user/use-cases/create";

import { AuthenticationProvider } from "../../providers/authentication";
import { AuthenticateUserController } from "../controllers/user/authenticate";
import { ConfirmUserEmailController } from "../controllers/user/confirm-user-email";
import { CreateUserController } from "../controllers/user/create-user";

const router = Router();

const authenticationProvider = new AuthenticationProvider();

const createUserController = new CreateUserController(
  new CreateUser(authenticationProvider)
);

const confirmUserEmailController = new ConfirmUserEmailController(
  new ConfirmUserEmail(authenticationProvider)
);

const authenticateUserController = new AuthenticateUserController(
  new AuthenticateUser(authenticationProvider)
);

router.post("/users", (req, res) => createUserController.handle(req, res));
router.put("/users/confirm-email", (req, res) =>
  confirmUserEmailController.handle(req, res)
);

router.post("/auth", (req, res) => authenticateUserController.handle(req, res));

export { router };
