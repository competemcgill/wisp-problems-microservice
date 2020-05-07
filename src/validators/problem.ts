import { body, param, ValidationChain } from "express-validator/check";
import { isString } from "util";

export function problemValidator(method: string): ValidationChain[] {
    switch (method) {
        case "GET /problems": {
            return [];
        }
        case "GET /problems/:problemId": {
            return [
                param("problemId", "Invalid or missing ':problemId'").exists().isMongoId()
            ];
        }
        case "POST /problems": {
            return [
                body("source", "Invalid or missing 'source'").isString().exists(),
                body("sourceLink", "Invalid or missing 'sourceLink'").isString().exists(),
                body("problemSetId", "Invalid or missing 'problemSetId'").isString().exists(),
                body("problemMetadata", "Invalid or missing 'problemMetadata' (optional)").optional()
            ];
        }
        case "PUT /problems/:problemId": {
            return [
                param("problemId", "Invalid or missing ':problemId'").exists().isMongoId(),
                body("source", "Invalid or missing 'source'").isString().exists(),
                body("sourceLink", "Invalid or missing 'sourceLink'").isString().exists(),
                body("problemSetId", "Invalid or missing 'problemSetId'").isString().exists(),
                body("problemMetadata", "Invalid or missing 'problemMetadata' (optional)").optional()
            ];
        }
        case "DELETE /problems/:problemId": {
            return [
                param("problemId", "Invalid or missing ':problemId'").exists().isMongoId()
            ];
        }
    }
}