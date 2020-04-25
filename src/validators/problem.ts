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
                body("stuff", "Invalid or missing 'stuff'").exists()
            ];
        }
        case "PUT /problems/:problemId": {
            return [
                param("problemId", "Invalid or missing ':problemId'").exists().isMongoId(),
                body("stuff", "Invalid or missing 'stuff'").exists()
            ];
        }
        case "DELETE /problems/:problemId": {
            return [
                param("problemId", "Invalid or missing ':problemId'").exists().isMongoId()
            ];
        }
    }
}