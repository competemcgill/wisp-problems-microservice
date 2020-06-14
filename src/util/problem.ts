import { IProblemModel } from "../database/models/problem";
import { problemDBInteractions } from "../database/interactions/problem";
import { problemSetDBInteractions } from "../database/interactions/problemSet";

export const problemUtil = {
    updateProblemCount: async (problem: IProblemModel): Promise<void> => {
        for (const problemSetId of problem.problemSetIds) {
            const problemCount: number = await problemDBInteractions.countInProblemSet(
                problemSetId
            );
            await problemSetDBInteractions.setProblemCount(
                problemSetId,
                problemCount
            );
        }
    }
};
