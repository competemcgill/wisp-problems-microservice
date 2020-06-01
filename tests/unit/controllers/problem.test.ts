import sinon from "sinon";
import { IProblem, Difficulty, PlatformName } from "../../../src/interfaces/IProblem";
import { IProblemSet } from "../../../src/interfaces/IProblemSet";
import { problemController } from "../../../src/controllers/problem";
import { problemDBInteractionsStubs } from "../stubs/problem";
import { problemSetDBInteractionsStubs } from "../stubs/problemSet";
import { mockReq, mockRes } from 'sinon-express-mock';
import chai, { expect } from "chai";

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

describe("Problems controller tests", () => {
    before( () => {
        problemDBStubs = problemDBInteractionsStubs();
        problemSetDBStubs = problemSetDBInteractionsStubs();
    });

    beforeEach( () => {
        mockRes.status = sinon.stub().returns(mockRes);
        mockRes.send = sinon.stub().returns(mockRes);
    });

    afterEach(() => {
        sinon.reset();
    });

    after(() => {
        problemDBStubs.restoreStubs();
        problemSetDBStubs.restoreStubs();
    });

    describe("PROBLEMS: list", () => {

        it("status 200: returns successfully a list of a single tests problem", async () => {
            problemDBStubs.all.returns([testProblem]);
            await problemController.index(mockReq, mockRes);
            sinon.assert.calledOnce(problemDBStubs.all);
            sinon.assert.calledWith(mockRes.status, 200);
            sinon.assert.calledWith(mockRes.send, [testProblem]);
        });

        it("status 500: returns server error code if server fails", async () => {
            problemDBStubs.all.throws();
            await problemController.index(mockReq, mockRes);
            sinon.assert.calledOnce(problemDBStubs.all);
            sinon.assert.calledWith(mockRes.status, 500);
        });
    });
});