import { problemDBInteractionsStubs } from "../stubs/problem";
import { problemSetDBInteractionsStubs } from "../stubs/problemSet";

import sinon from "sinon";
import { problemUtil } from "../../../src/util/problem";
import {
    testProblemModel2,
    testProblemModel1,
    testProblemSetModel1
} from "../../util/sampleData";

// Initialized outside of "describe" blocks to ensure typesafety + intellisense
let stubs = {
    problemDB: problemDBInteractionsStubs(),
    problemSetDB: problemSetDBInteractionsStubs()
};

stubs.problemDB.restore();
stubs.problemSetDB.restore();

describe("Problems util tests", () => {
    before(() => {
        stubs = {
            problemDB: problemDBInteractionsStubs(),
            problemSetDB: problemSetDBInteractionsStubs()
        };
    });

    afterEach(() => {
        sinon.reset();
    });

    after(() => {
        stubs.problemDB.restore();
        stubs.problemSetDB.restore();
    });

    describe("Problem util", () => {
        it("updateProblemCount does nothing when a problem has no problem sets", async () => {
            await problemUtil.updateProblemCount(testProblemModel2);

            sinon.assert.notCalled(stubs.problemDB.countInProblemSet);
            sinon.assert.notCalled(stubs.problemSetDB.setProblemCount);
        });

        it("updateProblemCount properly updates a problem set's problem count when problem has problem sets", async () => {
            const problemCount = 1;
            stubs.problemDB.countInProblemSet.resolves(problemCount);
            stubs.problemSetDB.setProblemCount.resolves(testProblemSetModel1);

            await problemUtil.updateProblemCount(testProblemModel1);

            sinon.assert.calledOnce(stubs.problemDB.countInProblemSet);
            sinon.assert.calledOnce(stubs.problemSetDB.setProblemCount);
            sinon.assert.calledWith(
                stubs.problemDB.countInProblemSet,
                testProblemModel1.problemSetIds[0]
            );
            sinon.assert.calledWith(
                stubs.problemSetDB.setProblemCount,
                testProblemModel1.problemSetIds[0],
                problemCount
            );
        });
    });
});
