import sinon from "sinon";
import { problemController } from "../../../src/controllers/problem";
import { problemDBInteractionsStubs } from "../stubs/problem";
import { problemSetDBInteractionsStubs } from "../stubs/problemSet";
import { mockReq, mockRes } from "sinon-express-mock";
import { validatorStubs} from "../stubs/validator"
import { testProblemModel1 } from "../../util/sampleData";

// Initialized outside of "describe" blocks to ensure typesafety + intellisense
let stubs = {
    problemDB: problemDBInteractionsStubs(),
    problemSetDB: problemSetDBInteractionsStubs(),
    validators: validatorStubs()
};

stubs.problemDB.restore()
stubs.problemSetDB.restore()
stubs.validators.restore()

describe("Problems controller tests", () => {
    before(() => {
        stubs = {
            problemDB: problemDBInteractionsStubs(),
            problemSetDB: problemSetDBInteractionsStubs(),
            validators: validatorStubs()
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
        stubs.validators.restore();
    });

    describe("PROBLEMS: list", () => {
        it("status 200: returns successfully a list of a single tests problem", async () => {
            stubs.problemDB.all.resolves([testProblemModel1]);
            await problemController.index(mockReq, mockRes);
            sinon.assert.calledOnce(stubs.problemDB.all);
            sinon.assert.calledWith(mockRes.status, 200);
            sinon.assert.calledWith(mockRes.json, [testProblemModel1]);
        });

        it("status 500: returns server error code if server fails", async () => {
            stubs.problemDB.all.throws();
            await problemController.index(mockReq, mockRes);
            sinon.assert.calledOnce(stubs.problemDB.all);
            sinon.assert.calledWith(mockRes.status, 500);
        });
    });
});
