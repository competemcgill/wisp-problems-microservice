import { IProblemSetModel } from "../../src/database/models/problemSet";
import { IProblemSet } from "../../src/interfaces/IProblemSet";
import { IProblemModel } from "../../src/database/models/problem";
import { IProblem, PlatformName, Difficulty } from "../../src/interfaces/IProblem";

export const testProblem1: IProblem = {
    title: "Test Problem 1",
    problemId: "27796f7b6717753aeee14bb4ba2acf6f55c88956",
    source: PlatformName[0],
    sourceLink: "https://codeforces.com/problemset/problem/1/A",
    problemSetIds: ["exampleProblemSetMongoId1"],
    problemMetadata: {
        platformProblemId: "1A",
        difficulty: Difficulty[0]
    }
};

export const testProblemModel1 = <IProblemModel>{
    _id: "exampleProblemMongoId1",
    title: "Test Problem 1",
    problemId: "27796f7b6717753aeee14bb4ba2acf6f55c88956",
    source: PlatformName[0],
    sourceLink: "https://codeforces.com/problemset/problem/1/A",
    problemSetIds: ["exampleProblemSetMongoId1"],
    problemMetadata: {
        platformProblemId: "1A",
        difficulty: Difficulty[0]
    },
    __v: 0
};

export const testProblem2: IProblem = {
    title: "Test Problem 2",
    problemId: "83ee89968be3bd910e26415f595290990ac42dd6",
    source: PlatformName[0],
    sourceLink: "https://codeforces.com/problemset/problem/1/B",
    problemSetIds: ["exampleProblemSetMongoId2"],
    problemMetadata: {
        platformProblemId: "1B",
        difficulty: Difficulty[0]
    }
};

export const testProblemSet1: IProblemSet = {
    title: "Test Problem Set 1",
    description: "Test problem set 1 description.",
    tags: ["Dynamic programming", "Test"],
    problemCount: 1
};

export const testProblemSet2: IProblemSet = {
    title: "Test Problem Set 2",
    description: "Test problem set 2 description.",
    tags: ["Graph Theory", "Test"],
    problemCount: 1

}

export const testProblemSetModel1 = <IProblemSetModel>{
    _id: "exampleProblemSetMongoId1",
    title: "Test Problem Set 1",
    description: "Test problem set 1 description.",
    tags: ["Dynamic programming", "Test"],
    problemCount: 1,
    __v: 0

}

export const testProblemSetModel1Doc: any = {
    _id: "exampleProblemSetMongoId1",
    title: "Test Problem Set 1",
    description: "Test problem set 1 description.",
    tags: ["Dynamic programming", "Test"],
    problemCount: 1,
    __v: 0,
    _doc: {
        _id: "exampleProblemSetMongoId1",
        title: "Test Problem Set 1",
        description: "Test problem set 1 description.",
        tags: ["Dynamic programming", "Test"],
        problemCount: 1,
        __v: 0
    }

}

export const testProblemSetModel1IncludeProblems = {
    _id: "exampleProblemSetMongoId1",
    title: "Test Problem Set 1",
    description: "Test problem set 1 description.",
    tags: ["Dynamic programming", "Test"],
    problemCount: 1,
    __v: 0,
    problems: [testProblemModel1]

}

export const testProblemSetModel2 = <IProblemSetModel>{
    _id: "exampleProblemSetMongoId2",
    title: "Test Problem Set 2",
    description: "Test problem set 2 description.",
    tags: ["Graph Theory", "Test"],
    problemCount: 1,
    __v: 0
}