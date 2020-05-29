import { problemSetDBInteractions } from "../database/interactions/problemSet";
import { Difficulty } from "../interfaces/IProblem";

export async function validateProblemSetIds(problemSetIds: Array<string>) {
    const promiseArray = problemSetIds.map(problemSetId => problemSetDBInteractions.find(problemSetId));
    const problemSetArray = await Promise.all(promiseArray);
    return !problemSetArray.some(problemSet => problemSet === null);
}

export function validateProblemMetadata(problemMetadata) {
    return !(!("platformProblemId" in problemMetadata)
        || !("difficulty" in problemMetadata)
        || !(problemMetadata.difficulty in Difficulty));
}