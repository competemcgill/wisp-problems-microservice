// TODO: mock DB interactions
import sinon from "sinon";
import chai, { expect } from "chai";
import { IProblem, Difficulty, PlatformName } from "../../src/interfaces/IProblem";
import { IProblemSet } from "../../src/interfaces/IProblemSet";
import { problemController } from "../../src/controllers/problem";

const testProblemSet: IProblemSet = {
    title: "Test Problem Set",
    description: "Test problem set description.",
    tags: ["Dynamic programming", "Test"],
    problemCount: 1
};
const testProblem: IProblem = {
    title: "Test Problem",
    problemId: "27796f7b6717753aeee14bb4ba2acf6f55c88956",
    source: PlatformName[0],
    sourceLink: "https://codeforces.com/problemset/problem/1/A",
    problemSetIds: [],
    problemMetadata: {
        platformProblemId: "1A",
        difficulty: Difficulty[0]
    }
};

describe("Problems controller tests", () => {
    describe("PROBLEMS: list", () => {
        it("status 200: returns a list of problems", async () => {
            expect(true).to.be.true;
        });
    });
});