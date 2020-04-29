export enum PlatformName {
    CODEFORCES, OTHER
}

export interface IProblem {
    source: PlatformName;
    problemId: String;
    sourceLink: String;
    problemSetId: String;
    problemMetadata: {
        platformProblemId: String;
        // TODO: add difficulty (different depending on platform)
    }
}
