import sinon from "sinon";
import { problemSetDBInteractionsStubs } from "../stubs/problemSet";
import { problemSetController } from "../../../src/controllers/problemSet";
import { mockReq, mockRes } from "sinon-express-mock";
import { problemDBInteractionsStubs } from "../stubs/problem";
import { statusCodes } from "../../../src/config/statusCodes";
import {
    validatorStubs,
    validationErrorWithMessage,
    emptyValidationError
} from "../stubs/validator";
import {
    testProblemSetModel1,
    testProblemSetModel2,
    testProblemSetModel1Doc,
    testProblemModel1,
    testProblemSetModel1IncludeProblems,
    testProblemSet1
} from "../../util/sampleData";

// Initialized outside of "describe" blocks to ensure typesafety + intellisense
let stubs = {
    problemDB: problemDBInteractionsStubs(),
    problemSetDB: problemSetDBInteractionsStubs(),
    validators: validatorStubs()
};
stubs.problemDB.restore();
stubs.problemSetDB.restore();
stubs.validators.restore();

describe("Problem sets controller tests", () => {
    before(() => {
        stubs = {
            problemDB: problemDBInteractionsStubs(),
            problemSetDB: problemSetDBInteractionsStubs(),
            validators: validatorStubs()
        };
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

    describe("Index", () => {
        let req;
        beforeEach(() => {
            req = mockReq({
                query: {}
            });
        });

        it("status 200: returns successfully a list of a single problem set", async () => {
            stubs.problemSetDB.all.resolves([testProblemSetModel1]);
            await problemSetController.index(req, mockRes);
            sinon.assert.calledOnce(stubs.problemSetDB.all);
            sinon.assert.notCalled(stubs.problemDB.listByProblemSet);
            sinon.assert.calledWith(mockRes.status, statusCodes.SUCCESS);
            sinon.assert.calledWith(mockRes.json, [testProblemSetModel1]);
        });

        it("status 200: returns successfully a list of a multiple problem sets", async () => {
            stubs.problemSetDB.all.resolves([
                testProblemSetModel1,
                testProblemSetModel2
            ]);
            await problemSetController.index(req, mockRes);
            sinon.assert.calledOnce(stubs.problemSetDB.all);
            sinon.assert.notCalled(stubs.problemDB.listByProblemSet);
            sinon.assert.calledWith(mockRes.status, statusCodes.SUCCESS);
            sinon.assert.calledWith(mockRes.json, [
                testProblemSetModel1,
                testProblemSetModel2
            ]);
        });

        it("status 200: returns successfully a list of problem sets with problems included if includeProblems=true", async () => {
            stubs.problemSetDB.all.resolves([testProblemSetModel1Doc]);
            stubs.problemDB.listByProblemSet.resolves([testProblemModel1]);
            req.query.includeProblems = "true";
            await problemSetController.index(req, mockRes);
            sinon.assert.calledOnce(stubs.problemSetDB.all);
            sinon.assert.calledOnce(stubs.problemDB.listByProblemSet);
            sinon.assert.calledWith(
                stubs.problemDB.listByProblemSet,
                testProblemSetModel1._id
            );
            sinon.assert.calledWith(mockRes.status, statusCodes.SUCCESS);
            sinon.assert.calledWith(mockRes.json, [
                testProblemSetModel1IncludeProblems
            ]);
        });

        it("status 500: returns server error if server fails", async () => {
            stubs.problemSetDB.all.throws();
            await problemSetController.index(req, mockRes);
            sinon.assert.calledOnce(stubs.problemSetDB.all);
            sinon.assert.notCalled(stubs.problemDB.listByProblemSet);
            sinon.assert.calledWith(mockRes.status, statusCodes.SERVER_ERROR);
        });
    });

    describe("Show", () => {
        let req;
        beforeEach(() => {
            req = mockReq({
                query: {}
            });
        });

        it("status 200: returns successfully a single problem set", async () => {
            stubs.problemSetDB.find.resolves(testProblemSetModel1Doc);
            stubs.validators.validationResult.returns(
                <any>emptyValidationError()
            );
            req.params.problemSetId = "exampleProblemSetMongoId1";
            await problemSetController.show(req, mockRes);
            sinon.assert.calledOnce(stubs.problemSetDB.find);
            sinon.assert.notCalled(stubs.problemDB.listByProblemSet);
            sinon.assert.calledWith(
                stubs.problemSetDB.find,
                req.params.problemSetId
            );
            sinon.assert.calledWith(mockRes.status, statusCodes.SUCCESS);
            sinon.assert.calledWith(mockRes.json, testProblemSetModel1);
        });

        it("status 200: returns successfully a single problem set with problems included if includeProblems=true", async () => {
            stubs.problemSetDB.find.resolves(testProblemSetModel1Doc);
            stubs.problemDB.listByProblemSet.resolves([testProblemModel1]);
            stubs.validators.validationResult.returns(
                <any>emptyValidationError()
            );
            req.params.problemSetId = "exampleProblemSetMongoId1";
            req.query.includeProblems = "true";
            await problemSetController.show(req, mockRes);
            sinon.assert.calledOnce(stubs.problemSetDB.find);
            sinon.assert.calledOnce(stubs.problemDB.listByProblemSet);
            sinon.assert.calledWith(
                stubs.problemSetDB.find,
                req.params.problemSetId
            );
            sinon.assert.calledWith(
                stubs.problemDB.listByProblemSet,
                req.params.problemSetId
            );
            sinon.assert.calledWith(mockRes.status, statusCodes.SUCCESS);
            sinon.assert.calledWith(
                mockRes.json,
                testProblemSetModel1IncludeProblems
            );
        });

        it("status 404: returns an appropriate response if user doesn't exist", async () => {
            stubs.problemSetDB.find.resolves(null);
            stubs.validators.validationResult.returns(
                <any>emptyValidationError()
            );
            req.params.problemSetId = "mongoIdThatDoesNotExist";
            await problemSetController.show(req, mockRes);
            sinon.assert.calledOnce(stubs.problemSetDB.find);
            sinon.assert.notCalled(stubs.problemDB.listByProblemSet);
            sinon.assert.calledWith(
                stubs.problemSetDB.find,
                req.params.problemSetId
            );
            sinon.assert.calledWith(mockRes.status, statusCodes.NOT_FOUND);
            sinon.assert.calledWith(mockRes.json, {
                status: statusCodes.NOT_FOUND,
                message: "ProblemSet not found"
            });
        });

        it("status 422: returns an appropriate response with validation error", async () => {
            const errorMsg = {
                status: statusCodes.MISSING_PARAMS,
                message:
                    "params[problemSetId]: Invalid or missing ':problemSetId'"
            };
            req.params.problemSetId = "not ObjectId";
            stubs.validators.validationResult.returns(
                <any>validationErrorWithMessage(errorMsg)
            );
            await problemSetController.show(req, mockRes);
            sinon.assert.calledOnce(stubs.validators.validationResult);
            sinon.assert.calledWith(mockRes.status, statusCodes.MISSING_PARAMS);
            sinon.assert.calledWith(mockRes.json, errorMsg);
        });

        it("status 500: returns error if server fails", async () => {
            stubs.problemSetDB.find.throws();
            stubs.validators.validationResult.returns(
                <any>emptyValidationError()
            );
            req.params.problemSetId = "exampleProblemSetMongoId1";
            await problemSetController.show(req, mockRes);
            sinon.assert.calledOnce(stubs.problemSetDB.find);
            sinon.assert.notCalled(stubs.problemDB.listByProblemSet);
            sinon.assert.calledWith(
                stubs.problemSetDB.find,
                req.params.problemSetId
            );
            sinon.assert.calledWith(mockRes.status, statusCodes.SERVER_ERROR);
        });
    });

    describe("Create", () => {
        let req;
        beforeEach(() => {
            req = mockReq({
                body: {
                    ...testProblemSet1
                }
            });
        });

        it("status 200: returns successfully a created problem set", async () => {
            stubs.problemSetDB.create.resolves(testProblemSetModel1);
            stubs.validators.validationResult.returns(
                <any>emptyValidationError()
            );
            await problemSetController.create(req, mockRes);
            sinon.assert.calledOnce(stubs.problemSetDB.create);
            sinon.assert.calledWith(stubs.problemSetDB.create, req.body);
            sinon.assert.calledWith(mockRes.status, statusCodes.SUCCESS);
            sinon.assert.calledWith(mockRes.json, testProblemSetModel1);
        });

        it("status 422: returns an appropriate response with validation error", async () => {
            const errorMsg = {
                status: statusCodes.MISSING_PARAMS,
                message: "body[title]: Invalid or missing 'title'"
            };
            stubs.validators.validationResult.returns(
                <any>validationErrorWithMessage(errorMsg)
            );
            await problemSetController.create(req, mockRes);
            sinon.assert.calledOnce(stubs.validators.validationResult);
            sinon.assert.notCalled(stubs.problemSetDB.create);
            sinon.assert.calledWith(mockRes.status, statusCodes.MISSING_PARAMS);
            sinon.assert.calledWith(mockRes.json, errorMsg);
        });

        it("status 500: returns error if server fails", async () => {
            stubs.problemSetDB.create.throws();
            stubs.validators.validationResult.returns(
                <any>emptyValidationError()
            );
            await problemSetController.create(req, mockRes);
            sinon.assert.calledOnce(stubs.problemSetDB.create);
            sinon.assert.calledWith(stubs.problemSetDB.create, req.body);
            sinon.assert.calledWith(mockRes.status, statusCodes.SERVER_ERROR);
        });
    });

    describe("Update", () => {
        let req;
        beforeEach(() => {
            req = mockReq({
                params: {
                    problemSetId: testProblemSetModel1._id
                },
                body: {
                    ...testProblemSet1
                }
            });
        });

        it("status 200: returns successfully an updated title", async () => {
            stubs.validators.validationResult.returns(
                <any>emptyValidationError()
            );
            stubs.problemSetDB.find.resolves(testProblemSetModel1);

            const updatedUser = JSON.parse(JSON.stringify(testProblemSet1));
            updatedUser._id = req.params.problemSetId;
            updatedUser.title = "Test Problem Set Title 1 Updated";
            stubs.problemSetDB.update.resolves(updatedUser);

            req.body.title = "Test Problem Set Title 1 Updated";
            await problemSetController.update(req, mockRes);

            sinon.assert.calledOnce(stubs.problemSetDB.find);
            sinon.assert.calledOnce(stubs.problemSetDB.update);
            sinon.assert.calledWith(
                stubs.problemSetDB.find,
                req.params.problemSetId
            );
            sinon.assert.calledWith(
                stubs.problemSetDB.update,
                req.params.problemSetId,
                req.body
            );
            sinon.assert.calledWith(mockRes.status, statusCodes.SUCCESS);
            sinon.assert.calledWith(mockRes.json, updatedUser);
        });

        it("status 200: returns successfully multiple updated fields", async () => {
            stubs.validators.validationResult.returns(
                <any>emptyValidationError()
            );
            stubs.problemSetDB.find.resolves(testProblemSetModel1);

            const updatedUser = JSON.parse(JSON.stringify(testProblemSet1));
            updatedUser._id = req.params.problemSetId;
            updatedUser.title = "Test Problem Set Title 1 Updated";
            updatedUser.description = "description 1 Updated";
            updatedUser.tags = ["Tag1", "Tag2"];
            stubs.problemSetDB.update.resolves(updatedUser);

            req.body.title = "Test Problem Set Title 1 Updated";
            req.body.description = "description 1 Updated";
            req.body.tags = ["Tag1", "Tag2"];
            await problemSetController.update(req, mockRes);

            sinon.assert.calledOnce(stubs.problemSetDB.find);
            sinon.assert.calledOnce(stubs.problemSetDB.update);
            sinon.assert.calledWith(
                stubs.problemSetDB.find,
                req.params.problemSetId
            );
            sinon.assert.calledWith(
                stubs.problemSetDB.update,
                req.params.problemSetId,
                req.body
            );
            sinon.assert.calledWith(mockRes.status, statusCodes.SUCCESS);
            sinon.assert.calledWith(mockRes.json, updatedUser);
        });

        it("status 200: returns unchanged problem set if nothing is different", async () => {
            stubs.validators.validationResult.returns(
                <any>emptyValidationError()
            );
            stubs.problemSetDB.find.resolves(testProblemSetModel1);

            const updatedUser = JSON.parse(JSON.stringify(testProblemSet1));
            updatedUser._id = req.params.problemSetId;
            stubs.problemSetDB.update.resolves(updatedUser);

            await problemSetController.update(req, mockRes);

            sinon.assert.calledOnce(stubs.problemSetDB.find);
            sinon.assert.calledOnce(stubs.problemSetDB.update);
            sinon.assert.calledWith(
                stubs.problemSetDB.find,
                req.params.problemSetId
            );
            sinon.assert.calledWith(
                stubs.problemSetDB.update,
                req.params.problemSetId,
                req.body
            );
            sinon.assert.calledWith(mockRes.status, statusCodes.SUCCESS);
            sinon.assert.calledWith(mockRes.json, updatedUser);
        });

        it("status 404: returns an appropriate response if user doesn't exist", async () => {
            stubs.problemSetDB.find.resolves(null);
            stubs.validators.validationResult.returns(
                <any>emptyValidationError()
            );
            req.params.problemSetId = "mongoIdThatDoesNotExist";
            await problemSetController.update(req, mockRes);
            sinon.assert.calledOnce(stubs.problemSetDB.find);
            sinon.assert.notCalled(stubs.problemDB.update);
            sinon.assert.calledWith(
                stubs.problemSetDB.find,
                req.params.problemSetId
            );
            sinon.assert.calledWith(mockRes.status, statusCodes.NOT_FOUND);
            sinon.assert.calledWith(mockRes.json, {
                status: statusCodes.NOT_FOUND,
                message: "ProblemSet not found"
            });
        });

        it("status 422: returns an appropriate response with validation error", async () => {
            const errorMsg = {
                status: statusCodes.MISSING_PARAMS,
                message: "body[title]: Invalid or missing 'title'"
            };
            stubs.validators.validationResult.returns(
                <any>validationErrorWithMessage(errorMsg)
            );
            await problemSetController.update(req, mockRes);
            sinon.assert.calledOnce(stubs.validators.validationResult);
            sinon.assert.notCalled(stubs.problemSetDB.find);
            sinon.assert.notCalled(stubs.problemSetDB.update);
            sinon.assert.calledWith(mockRes.status, statusCodes.MISSING_PARAMS);
            sinon.assert.calledWith(mockRes.json, errorMsg);
        });

        it("status 500: returns error if server fails", async () => {
            stubs.problemSetDB.find.throws();
            stubs.validators.validationResult.returns(
                <any>emptyValidationError()
            );

            await problemSetController.update(req, mockRes);
            sinon.assert.calledOnce(stubs.problemSetDB.find);
            sinon.assert.calledWith(
                stubs.problemSetDB.find,
                req.params.problemSetId
            );
            sinon.assert.calledWith(mockRes.status, statusCodes.SERVER_ERROR);
        });
    });

    describe("Delete", () => {
        let req;
        beforeEach(() => {
            req = mockReq({
                params: {
                    problemSetId: testProblemSetModel1._id
                }
            });
        });

        it("status 200: returns status code SUCCESS upon deletion", async () => {
            stubs.validators.validationResult.returns(
                <any>emptyValidationError()
            );
            stubs.problemSetDB.find.resolves(testProblemSetModel1);
            stubs.problemSetDB.delete.resolves(testProblemSetModel1);

            await problemSetController.delete(req, mockRes);

            sinon.assert.calledOnce(stubs.problemSetDB.find);
            sinon.assert.calledOnce(stubs.problemSetDB.delete);
            sinon.assert.calledWith(
                stubs.problemSetDB.find,
                req.params.problemSetId
            );
            sinon.assert.calledWith(
                stubs.problemSetDB.delete,
                req.params.problemSetId
            );
            sinon.assert.calledWith(mockRes.status, statusCodes.SUCCESS);
            sinon.assert.calledWith(mockRes.json);
        });

        it("status 404: returns an appropriate response if user doesn't exist", async () => {
            stubs.validators.validationResult.returns(
                <any>emptyValidationError()
            );
            stubs.problemSetDB.find.resolves(null);
            stubs.problemSetDB.delete.resolves(null);

            await problemSetController.delete(req, mockRes);

            sinon.assert.calledOnce(stubs.problemSetDB.find);
            sinon.assert.notCalled(stubs.problemSetDB.delete);
            sinon.assert.calledWith(
                stubs.problemSetDB.find,
                req.params.problemSetId
            );
            sinon.assert.calledWith(mockRes.status, statusCodes.NOT_FOUND);
            sinon.assert.calledWith(mockRes.json, {
                status: statusCodes.NOT_FOUND,
                message: "ProblemSet not found"
            });
        });

        it("status 422: returns an appropriate response with validation error", async () => {
            const errorMsg = {
                status: statusCodes.MISSING_PARAMS,
                message:
                    "params[problemSetId]: Invalid or missing 'problemSetId'"
            };
            stubs.validators.validationResult.returns(
                <any>validationErrorWithMessage(errorMsg)
            );
            stubs.problemSetDB.find.resolves(null);
            stubs.problemSetDB.delete.resolves(null);

            await problemSetController.delete(req, mockRes);

            sinon.assert.calledOnce(stubs.validators.validationResult);
            sinon.assert.notCalled(stubs.problemSetDB.find);
            sinon.assert.notCalled(stubs.problemSetDB.delete);
            sinon.assert.calledWith(mockRes.status, statusCodes.MISSING_PARAMS);
            sinon.assert.calledWith(mockRes.json, errorMsg);
        });

        it("status 500: returns error if server fails", async () => {
            stubs.problemSetDB.find.throws();
            stubs.validators.validationResult.returns(
                <any>emptyValidationError()
            );

            await problemSetController.delete(req, mockRes);
            sinon.assert.calledOnce(stubs.problemSetDB.find);
            sinon.assert.calledWith(
                stubs.problemSetDB.find,
                req.params.problemSetId
            );
            sinon.assert.calledWith(mockRes.status, statusCodes.SERVER_ERROR);
        });
    });
});
