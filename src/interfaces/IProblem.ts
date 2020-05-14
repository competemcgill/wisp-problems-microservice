export enum PlatformName {
    CODEFORCES, OTHER
}

export enum Difficulty {
    easy, medium, hard
}

export interface IProblem {
    title: String;
    source: PlatformName;
    problemId: String;
    sourceLink: String;
    problemSetIds: [string];
    problemMetadata: {
        platformProblemId: String;
        difficulty: Difficulty;
    }
}
