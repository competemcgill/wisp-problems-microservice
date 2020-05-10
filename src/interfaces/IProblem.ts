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
    problemSetId: String;
    problemMetadata: {
        platformProblemId: String;
        difficulty: Difficulty;
        // TODO: add difficulty (different depending on platform)
    }
}
