import { IProblemModel } from "../database/models/problem";
import { problemDBInteractions } from "../database/interactions/problem";
import { problemSetDBInteractions } from "../database/interactions/problemSet";
import { IProblemSetModel } from "../database/models/problemSet";

export const problemUtil = {
    updateProblemCount: async (problem: IProblemModel): Promise<void> => {
        for (const problemSetId of problem.problemSetIds) {
            const problemCount: number = await problemDBInteractions.countInProblemSet(
                problemSetId
            );
            const currProblemSet: IProblemSetModel = await problemSetDBInteractions.find(
                problemSetId
            );
            currProblemSet.problemCount = problemCount;
            await problemSetDBInteractions.update(problemSetId, currProblemSet);
        }
    }
};
