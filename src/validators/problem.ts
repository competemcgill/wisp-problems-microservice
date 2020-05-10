import { body, param, ValidationChain } from "express-validator/check";

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
                body("title", "Invalid or missing 'title'").isString().exists(),
                body("source", "Invalid or missing 'source'").isString().exists(),
                body("sourceLink", "Invalid or missing 'sourceLink'").isString().exists(),
                body("problemSetIds", "Invalid or missing 'problemSetId'").isArray().exists(),
                body("problemMetadata", "Invalid or missing 'problemMetadata' (optional)").optional()
            ];
        }
        case "PUT /problems/:problemId": {
            return [
                param("problemId", "Invalid or missing ':problemId'").exists().isMongoId(),
                body("title", "Invalid or missing 'title'").isString().exists(),
                body("source", "Invalid or missing 'source'").isString().exists(),
                body("sourceLink", "Invalid or missing 'sourceLink'").isString().exists(),
                body("problemSetIds", "Invalid or missing 'problemSetId'").isArray().exists(),
                body("problemMetadata", "Invalid or missing 'problemMetadata' (optional)").optional()
            ];
        }
        case "DELETE /problems/:problemId": {
            return [
                param("problemId", "Invalid or missing ':problemId'").exists().isMongoId()
            ];
        }
        case "GET /problems/:generatedProblemId/exists": {
            return [
                param("generatedProblemId", "Invalid or missing ':generatedProblemId'").exists()
            ];
        }
    }
}