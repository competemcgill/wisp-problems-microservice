import { Router } from "express";
import { problemSetController } from "../controllers/problemSet";
import { problemSetValidator } from "../validators/problemSet";

const problemSetRouter: Router = Router();

problemSetRouter.get("/", problemSetValidator("GET /problemSets"), problemSetController.index);

problemSetRouter.get("/:problemSetId", problemSetValidator("GET /problemSets/:problemSetId"), problemSetController.show);

problemSetRouter.post("/", problemSetValidator("POST /problemSets"), problemSetController.create);

problemSetRouter.put("/:problemSetId", problemSetValidator("PUT /problemSets/:problemSetId"), problemSetController.update);

problemSetRouter.delete("/:problemSetId", problemSetValidator("DELETE /problemSets/:problemSetId"), problemSetController.delete);

export { problemSetRouter };
