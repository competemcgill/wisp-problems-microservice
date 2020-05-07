import { body, param, ValidationChain } from "express-validator/check";

export function problemSetValidator(method: string): ValidationChain[] {
    switch (method) {
        case "GET /problemSets": {
            return [];
        }
        case "GET /problemSets/:problemSetId": {
            return [
                param("problemSetId", "Invalid or missing ':problemSetId'").exists().isMongoId()
            ];
        }
        case "POST /problemSets": {
            return [
                body("title", "Invalid or missing 'title'").isString().exists(),
                body("description", "Invalid or missing 'description'").isString().exists(),
                body("tags", "Invalid or missing 'tags'").exists().isArray(),
            ];
        }
        case "PUT /problemSets/:problemSetId": {
            return [
                param("problemSetId", "Invalid or missing ':problemSetId'").exists().isMongoId(),
                body("title", "Invalid or missing 'title'").isString().exists(),
                body("description", "Invalid or missing 'description'").isString().exists(),
                body("tags", "Invalid or missing 'tags'").exists().isArray(),
            ];
        }
        case "DELETE /problemSets/:problemSetId": {
            return [
                param("problemSetId", "Invalid or missing ':problemSetId'").exists().isMongoId()
            ];
        }
    }
}