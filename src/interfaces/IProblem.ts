export enum PlatformName {
    CODEFORCES,
    OTHER,
}

export enum Difficulty {
    easy,
    medium,
    hard,
}

export interface IProblem {
    title: string;
    source: string;
    problemId: string;
    sourceLink: string;
    problemSetIds: string[];
    problemMetadata: {
        platformProblemId: string;
        difficulty: string;
    };
}
