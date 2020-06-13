import { problemDBInteractionsStubs } from "../stubs/problem";
import { problemSetDBInteractionsStubs } from "../stubs/problemSet";

import sinon from "sinon";
import { problemUtil } from "../../../src/util/problem";
import { testProblemModel2 } from "../../util/sampleData";

// Initialized outside of "describe" blocks to ensure typesafety + intellisense
let stubs = {
    problemDB: problemDBInteractionsStubs(),
    problemSetDB: problemSetDBInteractionsStubs()
};

stubs.problemDB.restore();
stubs.problemSetDB.restore();

describe("Problems controller tests", () => {
    before(() => {
        stubs = {
            problemDB: problemDBInteractionsStubs(),
            problemSetDB: problemSetDBInteractionsStubs()
        };
    });

    beforeEach(() => {
        //
    });

    afterEach(() => {
        sinon.reset();
    });

    after(() => {
        stubs.problemDB.restore();
        stubs.problemSetDB.restore();
    });

    describe("Problem util", () => {
        describe("updateProblemCount does nothing when a problem has no problem sets", async () => {
            await problemUtil.updateProblemCount(testProblemModel2);

            sinon.assert.notCalled(stubs.problemDB.countInProblemSet);
            sinon.assert.notCalled(stubs.problemDB.find);
        });

        describe("updateProblemCount properly updates a problem set's problem count when problem has problem sets", async () => {
            // TODO
        });
    });
});
