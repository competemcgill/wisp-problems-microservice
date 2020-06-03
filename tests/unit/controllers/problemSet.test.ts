import sinon from "sinon";
import chai, { expect } from "chai";
import { IProblem, Difficulty, PlatformName } from "../../../src/interfaces/IProblem";
import { IProblemSet } from "../../../src/interfaces/IProblemSet";
import { problemSetDBInteractionsStubs } from "../stubs/problemSet";
import { problemSetController } from "../../../src/controllers/problemSet";
import { mockReq, mockRes } from "sinon-express-mock";
import { problemDBInteractionsStubs } from "../stubs/problem";

let problemDBStubs;
let problemSetDBStubs;

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

describe("Problem sets controller tests", () => {

    before(() => {
        problemDBStubs = problemDBInteractionsStubs();
        problemSetDBStubs = problemSetDBInteractionsStubs();
    });

    beforeEach( () => {
        mockRes.status = sinon.stub().returns(mockRes);
        mockRes.json = sinon.stub().returns(mockRes);
    });

    afterEach( () => {
        sinon.reset();
    });

    after( () => {
        problemDBStubs.restoreStubs();
        problemSetDBStubs.restoreStubs();
    });

    describe("PROBLEM SETS: list", () => {
        it("status 200: returns successfully a list of a single tests problem set", async () => {
            // TODO: Write tests here
        });
    });
});