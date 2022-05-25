import "dotenv/config";
import express from "express";
import { interceptorExceptions } from "./infra/http/interceptors";

import { router } from "./infra/http/routes";

const app = express();

app.use(express.json());
app.use("/api", router);
app.use(interceptorExceptions);

export { app };
