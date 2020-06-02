import sinon from "sinon";
import { IProblem, Difficulty, PlatformName } from "../../../src/interfaces/IProblem";
import { problemSetDBInteractionsStubs } from "../stubs/problemSet";
import { problemSetController } from "../../../src/controllers/problemSet";
import { mockReq, mockRes } from "sinon-express-mock";
import { problemDBInteractionsStubs } from "../stubs/problem";
import { statusCodes } from "../../../src/config/statusCodes";
import { IProblemSetModel } from "database/models/problemSet";

// let stubs;
let stubs = {
    problemDB: problemDBInteractionsStubs(),
    problemSetDB: problemSetDBInteractionsStubs()
};
stubs.problemDB.restore()
stubs.problemSetDB.restore()

const testProblemSet = <IProblemSetModel>{
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
        stubs = {
            problemDB: problemDBInteractionsStubs(),
            problemSetDB: problemSetDBInteractionsStubs()
        }
    });

    beforeEach(() => {
        mockRes.status = sinon.stub().returns(mockRes);
        mockRes.json = sinon.stub().returns(mockRes);
    });

    afterEach(() => {
        sinon.reset();
    });

    after(() => {
        stubs.problemDB.restore();
        stubs.problemSetDB.restore();
    });

    describe("Index", () => {
        let req;
        beforeEach(() => {
            req = mockReq({
                query: {
                }
            })
        })

        it("status 200: returns successfully a list of a single problem set", async () => {
            stubs.problemSetDB.all.resolves([testProblemSet]);
            await problemSetController.index(req, mockRes);
            sinon.assert.calledOnce(stubs.problemSetDB.all);
            sinon.assert.calledWith(mockRes.status, statusCodes.SUCCESS);
            sinon.assert.calledWith(mockRes.json, [testProblemSet]);
        });

        it("status 200: returns successfully a list of a multiple problem sets", async () => {
            stubs.problemSetDB.all.resolves([testProblemSet, testProblemSet]);
            await problemSetController.index(req, mockRes);
            sinon.assert.calledOnce(stubs.problemSetDB.all);
            sinon.assert.calledWith(mockRes.status, statusCodes.SUCCESS);
            sinon.assert.calledWith(mockRes.json, [testProblemSet, testProblemSet]);
        });

        it("status 500: returns server error if server fails", async () => {
            stubs.problemSetDB.all.throws();
            await problemSetController.index(req, mockRes);
            sinon.assert.calledOnce(stubs.problemSetDB.all);
            sinon.assert.calledWith(mockRes.status, statusCodes.SERVER_ERROR);
        })
    });
});