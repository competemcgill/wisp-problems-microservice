import { body, param, ValidationChain } from "express-validator/check";
import {problemSetDBInteractions} from "../database/interactions/problemSet";

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
                body("problemSetIds", "Invalid or nonexistent 'problemSetId'").custom(validateProblemSetIds),
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

async function validateProblemSetIds(problemSetIds: Array<string>) {
    const promiseArray = problemSetIds.map(async problemSetId => await problemSetDBInteractions.find(problemSetId));
    const problemSetArray = await Promise.all(promiseArray);
    return problemSetArray.filter(problemSet => problemSet === null).length === 0;
}