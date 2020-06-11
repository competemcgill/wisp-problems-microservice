import { Router } from "express";
import { problemController } from "../controllers/problem";
import { problemValidator } from "../validators/problem";

const problemRouter: Router = Router();

problemRouter.get(
    "/",
    problemValidator("GET /problems"),
    problemController.index
);

problemRouter.get(
    "/:problemId",
    problemValidator("GET /problems/:problemId"),
    problemController.show
);

problemRouter.post(
    "/",
    problemValidator("POST /problems"),
    problemController.create
);

problemRouter.put(
    "/:problemId",
    problemValidator("PUT /problems/:problemId"),
    problemController.update
);

problemRouter.delete(
    "/:problemId",
    problemValidator("DELETE /problems/:problemId"),
    problemController.delete
);

problemRouter.get(
    "/:generatedProblemId/exists",
    problemValidator("GET /problems/:generatedProblemId/exists"),
    problemController.exists
);

export { problemRouter };
