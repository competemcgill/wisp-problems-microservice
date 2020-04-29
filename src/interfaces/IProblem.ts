export enum PlatformName {
    CODEFORCES, OTHER
}

export interface IProblem {
    source: PlatformName;
    problemID: String;
    sourceLink: String;
    problemSetID: String;
    problemMetadata: {
        platformProblemID: String;
        // TODO: add difficulty (different depending on platform)
    }
}
