import { problemSetDBInteractions } from '../database/interactions/problemSet';
import { Difficulty, PlatformName } from '../interfaces/IProblem';

export const validateProblemSetIds = async (problemSetIds: Array<string>) => {
    const promiseArray = problemSetIds.map((problemSetId) => problemSetDBInteractions.find(problemSetId));
    const problemSetArray = await Promise.all(promiseArray);
    return !problemSetArray.some((problemSet) => problemSet === null);
};

export const validateProblemMetadata = (problemMetadata) => {
    return (
        'platformProblemId' in problemMetadata &&
        'difficulty' in problemMetadata &&
        problemMetadata.difficulty.toLowerCase() in Difficulty
    );
};

export const validateProblemPlatform = (platform) => {
    return platform.toUpperCase() in PlatformName;
};
