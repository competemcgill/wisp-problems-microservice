import sinon from "sinon";
import { IProblem, Difficulty, PlatformName } from "../../../src/interfaces/IProblem";
import { problemSetDBInteractionsStubs } from "../stubs/problemSet";
import { problemSetController } from "../../../src/controllers/problemSet";
import { mockReq, mockRes } from "sinon-express-mock";
import { problemDBInteractionsStubs } from "../stubs/problem";
import { statusCodes } from "../../../src/config/statusCodes";
import { IProblemSetModel, ProblemSet } from "../../../src/database/models/problemSet";
import { IProblemSet } from "../../../src/interfaces/IProblemSet";
import { IProblemModel } from "../../../src/database/models/problem";
import { validatorStubs, validationErrorWithMessage, emptyValidationError } from "../stubs/misc"

// let stubs;
let stubs = {
    problemDB: problemDBInteractionsStubs(),
    problemSetDB: problemSetDBInteractionsStubs(),
    validators: validatorStubs()
};
stubs.problemDB.restore()
stubs.problemSetDB.restore()
stubs.validators.restore()


const testProblem1: IProblem = {
    title: "Test Problem",
    problemId: "27796f7b6717753aeee14bb4ba2acf6f55c88956",
    source: PlatformName[0],
    sourceLink: "https://codeforces.com/problemset/problem/1/A",
    problemSetIds: ["exampleProblemSetMongoId1"],
    problemMetadata: {
        platformProblemId: "1A",
        difficulty: Difficulty[0]
    }
};

const testProblemModel1 = <IProblemModel>{
    _id: "exampleProblemMongoId1",
    title: "Test Problem",
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


const testProblemSet1: IProblemSet = {
    title: "Test Problem Set 1",
    description: "Test problem set 1 description.",
    tags: ["Dynamic programming", "Test"],
    problemCount: 2
};

const testProblemSet2: IProblemSet = {
    title: "Test Problem Set 2",
    description: "Test problem set 2 description.",
    tags: ["Graph Theory", "Test"],
    problemCount: 1
}

const testProblemSetModel1 = <IProblemSetModel>{
    _id: "exampleProblemSetMongoId1",
    title: "Test Problem Set 1",
    description: "Test problem set 1 description.",
    tags: ["Dynamic programming", "Test"],
    problemCount: 1,
    __v: 0
}

const testProblemSetModel1Doc: any = {
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

const testProblemSetModel1IncludeProblems = {
    _id: "exampleProblemSetMongoId1",
    title: "Test Problem Set 1",
    description: "Test problem set 1 description.",
    tags: ["Dynamic programming", "Test"],
    problemCount: 1,
    __v: 0,
    problems: [testProblemModel1]
}

const testProblemSetModel2 = <IProblemSetModel>{
    _id: "exampleProblemSetMongoId2",
    title: "Test Problem Set 2",
    description: "Test problem set 2 description.",
    tags: ["Graph Theory", "Test"],
    problemCount: 1,
    __v: 0
}


describe("Problem sets controller tests", () => {

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
        stubs.validators.restore()
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
            stubs.problemSetDB.all.resolves([testProblemSetModel1]);
            await problemSetController.index(req, mockRes);
            sinon.assert.calledOnce(stubs.problemSetDB.all);
            sinon.assert.notCalled(stubs.problemDB.listByProblemSet);
            sinon.assert.calledWith(mockRes.status, statusCodes.SUCCESS);
            sinon.assert.calledWith(mockRes.json, [testProblemSetModel1]);
        });

        it("status 200: returns successfully a list of a multiple problem sets", async () => {
            stubs.problemSetDB.all.resolves([testProblemSetModel1, testProblemSetModel2]);
            await problemSetController.index(req, mockRes);
            sinon.assert.calledOnce(stubs.problemSetDB.all);
            sinon.assert.notCalled(stubs.problemDB.listByProblemSet);
            sinon.assert.calledWith(mockRes.status, statusCodes.SUCCESS);
            sinon.assert.calledWith(mockRes.json, [testProblemSetModel1, testProblemSetModel2]);
        });

        it("status 200: returns successfully a list of problem sets with problems included if includeProblems=true", async () => {
            stubs.problemSetDB.all.resolves([testProblemSetModel1Doc]);
            stubs.problemDB.listByProblemSet.resolves([testProblemModel1])
            req.query.includeProblems = "true";
            await problemSetController.index(req, mockRes);
            sinon.assert.calledOnce(stubs.problemSetDB.all);
            sinon.assert.calledOnce(stubs.problemDB.listByProblemSet);
            sinon.assert.calledWith(stubs.problemDB.listByProblemSet, testProblemSetModel1._id);
            sinon.assert.calledWith(mockRes.status, statusCodes.SUCCESS);
            sinon.assert.calledWith(mockRes.json, [testProblemSetModel1IncludeProblems]);
        });

        it("status 500: returns server error if server fails", async () => {
            stubs.problemSetDB.all.throws();
            await problemSetController.index(req, mockRes);
            sinon.assert.calledOnce(stubs.problemSetDB.all);
            sinon.assert.notCalled(stubs.problemDB.listByProblemSet);
            sinon.assert.calledWith(mockRes.status, statusCodes.SERVER_ERROR);
        })
    });

    describe("Show", () => {
        let req;
        beforeEach(() => {
            req = mockReq({
                query: {
                }
            })
        })

        it("status 200: returns successfully a single problem set", async () => {
            stubs.problemSetDB.find.resolves(testProblemSetModel1Doc);
            stubs.validators.validationResult.returns(<any>emptyValidationError());
            req.params.problemSetId = "exampleProblemSetMongoId1"
            await problemSetController.show(req, mockRes);
            sinon.assert.calledOnce(stubs.problemSetDB.find);
            sinon.assert.notCalled(stubs.problemDB.listByProblemSet);
            sinon.assert.calledWith(stubs.problemSetDB.find, req.params.problemSetId);
            sinon.assert.calledWith(mockRes.status, statusCodes.SUCCESS);
            sinon.assert.calledWith(mockRes.json, testProblemSetModel1);
        });

        it("status 200: returns successfully a single problem set with problems included if includeProblems=true", async () => {
            stubs.problemSetDB.find.resolves(testProblemSetModel1Doc);
            stubs.problemDB.listByProblemSet.resolves([testProblemModel1])
            stubs.validators.validationResult.returns(<any>emptyValidationError());
            req.params.problemSetId = "exampleProblemSetMongoId1"
            req.query.includeProblems = "true"
            await problemSetController.show(req, mockRes);
            sinon.assert.calledOnce(stubs.problemSetDB.find);
            sinon.assert.calledOnce(stubs.problemDB.listByProblemSet);
            sinon.assert.calledWith(stubs.problemSetDB.find, req.params.problemSetId);
            sinon.assert.calledWith(stubs.problemDB.listByProblemSet, req.params.problemSetId);
            sinon.assert.calledWith(mockRes.status, statusCodes.SUCCESS);
            sinon.assert.calledWith(mockRes.json, testProblemSetModel1IncludeProblems);
        });

        it("status 404: returns an appropriate response if user doesn't exist", async () => {
            stubs.problemSetDB.find.resolves(null);
            stubs.validators.validationResult.returns(<any>emptyValidationError());
            req.params.problemSetId = "mongoIdThatDoesNotExist"
            await problemSetController.show(req, mockRes);
            sinon.assert.calledOnce(stubs.problemSetDB.find);
            sinon.assert.notCalled(stubs.problemDB.listByProblemSet);
            sinon.assert.calledWith(stubs.problemSetDB.find, req.params.problemSetId);
            sinon.assert.calledWith(mockRes.status, statusCodes.NOT_FOUND);
            sinon.assert.calledWith(mockRes.json, { status: statusCodes.NOT_FOUND, message: "ProblemSet not found" });
        });

        it("status 422: returns an appropriate response with validation error", async () => {
            const errorMsg = { status: statusCodes.MISSING_PARAMS, message: "params[problemSetId]: Invalid or missing ':problemSetId'" };
            req.params.problemSetId = "not ObjectId";
            stubs.validators.validationResult.returns(<any>validationErrorWithMessage(errorMsg));
            await problemSetController.show(req, mockRes);
            sinon.assert.calledOnce(stubs.validators.validationResult);
            sinon.assert.calledWith(mockRes.status, statusCodes.MISSING_PARAMS);
            sinon.assert.calledWith(mockRes.json, errorMsg);
        });

        it("status 500: returns error if server fails", async () => {
            stubs.problemSetDB.find.throws();
            stubs.validators.validationResult.returns(<any>emptyValidationError());
            req.params.problemSetId = "exampleProblemSetMongoId1"
            await problemSetController.show(req, mockRes);
            sinon.assert.calledOnce(stubs.problemSetDB.find);
            sinon.assert.notCalled(stubs.problemDB.listByProblemSet);
            sinon.assert.calledWith(stubs.problemSetDB.find, req.params.problemSetId);
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
            })
        })

        it("status 200: returns successfully a created problem set", async () => {
            stubs.problemSetDB.create.resolves(testProblemSetModel1);
            stubs.validators.validationResult.returns(<any>emptyValidationError());
            await problemSetController.create(req, mockRes);
            sinon.assert.calledOnce(stubs.problemSetDB.create);
            sinon.assert.calledWith(stubs.problemSetDB.create, req.body);
            sinon.assert.calledWith(mockRes.status, statusCodes.SUCCESS);
            sinon.assert.calledWith(mockRes.json, testProblemSetModel1);
        });

        it("status 422: returns an appropriate response with validation error", async () => {
            const errorMsg = { status: statusCodes.MISSING_PARAMS, message: "body[title]: Invalid or missing 'title'" };
            stubs.validators.validationResult.returns(<any>validationErrorWithMessage(errorMsg));
            await problemSetController.create(req, mockRes);
            sinon.assert.calledOnce(stubs.validators.validationResult);
            sinon.assert.notCalled(stubs.problemSetDB.create);
            sinon.assert.calledWith(mockRes.status, statusCodes.MISSING_PARAMS);
            sinon.assert.calledWith(mockRes.json, errorMsg);
        });

        it("status 500: returns error if server fails", async () => {
            stubs.problemSetDB.create.throws();
            stubs.validators.validationResult.returns(<any>emptyValidationError());
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
            })
        })

        it("status 200: returns successfully an updated title", async () => {
            stubs.validators.validationResult.returns(<any>emptyValidationError());
            stubs.problemSetDB.find.resolves(testProblemSetModel1);

            const updatedUser = JSON.parse(JSON.stringify(testProblemSet1));
            updatedUser._id = req.params.problemSetId
            updatedUser.title = "Test Problem Set Title 1 Updated"
            stubs.problemSetDB.update.resolves(updatedUser);

            req.body.title = "Test Problem Set Title 1 Updated"
            await problemSetController.update(req, mockRes);

            sinon.assert.calledOnce(stubs.problemSetDB.find);
            sinon.assert.calledOnce(stubs.problemSetDB.update);
            sinon.assert.calledWith(stubs.problemSetDB.find, req.params.problemSetId);
            sinon.assert.calledWith(stubs.problemSetDB.update, req.params.problemSetId, req.body);
            sinon.assert.calledWith(mockRes.status, statusCodes.SUCCESS);
            sinon.assert.calledWith(mockRes.json, updatedUser);
        });

        it("status 200: returns successfully multiple updated fields", async () => {
            stubs.validators.validationResult.returns(<any>emptyValidationError());
            stubs.problemSetDB.find.resolves(testProblemSetModel1);

            const updatedUser = JSON.parse(JSON.stringify(testProblemSet1));
            updatedUser._id = req.params.problemSetId
            updatedUser.title = "Test Problem Set Title 1 Updated"
            updatedUser.description = "description 1 Updated"
            updatedUser.tags = ["Tag1", "Tag2"]
            stubs.problemSetDB.update.resolves(updatedUser);

            req.body.title = "Test Problem Set Title 1 Updated"
            req.body.description = "description 1 Updated"
            req.body.tags = ["Tag1", "Tag2"]
            await problemSetController.update(req, mockRes);

            sinon.assert.calledOnce(stubs.problemSetDB.find);
            sinon.assert.calledOnce(stubs.problemSetDB.update);
            sinon.assert.calledWith(stubs.problemSetDB.find, req.params.problemSetId);
            sinon.assert.calledWith(stubs.problemSetDB.update, req.params.problemSetId, req.body);
            sinon.assert.calledWith(mockRes.status, statusCodes.SUCCESS);
            sinon.assert.calledWith(mockRes.json, updatedUser);
        });

        it("status 200: returns unchanged problem set if nothing is different", async () => {
            stubs.validators.validationResult.returns(<any>emptyValidationError());
            stubs.problemSetDB.find.resolves(testProblemSetModel1);

            const updatedUser = JSON.parse(JSON.stringify(testProblemSet1));
            updatedUser._id = req.params.problemSetId
            stubs.problemSetDB.update.resolves(updatedUser);

            await problemSetController.update(req, mockRes);

            sinon.assert.calledOnce(stubs.problemSetDB.find);
            sinon.assert.calledOnce(stubs.problemSetDB.update);
            sinon.assert.calledWith(stubs.problemSetDB.find, req.params.problemSetId);
            sinon.assert.calledWith(stubs.problemSetDB.update, req.params.problemSetId, req.body);
            sinon.assert.calledWith(mockRes.status, statusCodes.SUCCESS);
            sinon.assert.calledWith(mockRes.json, updatedUser);
        });

        it("status 404: returns an appropriate response if user doesn't exist", async () => {
            stubs.problemSetDB.find.resolves(null);
            stubs.validators.validationResult.returns(<any>emptyValidationError());
            req.params.problemSetId = "mongoIdThatDoesNotExist"
            await problemSetController.update(req, mockRes);
            sinon.assert.calledOnce(stubs.problemSetDB.find);
            sinon.assert.notCalled(stubs.problemDB.update);
            sinon.assert.calledWith(stubs.problemSetDB.find, req.params.problemSetId);
            sinon.assert.calledWith(mockRes.status, statusCodes.NOT_FOUND);
            sinon.assert.calledWith(mockRes.json, { status: statusCodes.NOT_FOUND, message: "ProblemSet not found" });

        });

        it("status 422: returns an appropriate response with validation error", async () => {
            const errorMsg = { status: statusCodes.MISSING_PARAMS, message: "body[title]: Invalid or missing 'title'" };
            stubs.validators.validationResult.returns(<any>validationErrorWithMessage(errorMsg));
            await problemSetController.update(req, mockRes);
            sinon.assert.calledOnce(stubs.validators.validationResult);
            sinon.assert.notCalled(stubs.problemSetDB.find);
            sinon.assert.notCalled(stubs.problemSetDB.update);
            sinon.assert.calledWith(mockRes.status, statusCodes.MISSING_PARAMS);
            sinon.assert.calledWith(mockRes.json, errorMsg);
        });

        it("status 500: returns error if server fails", async () => {
            stubs.problemSetDB.find.throws();
            stubs.validators.validationResult.returns(<any>emptyValidationError());

            await problemSetController.update(req, mockRes);
            sinon.assert.calledOnce(stubs.problemSetDB.find);
            sinon.assert.calledWith(stubs.problemSetDB.find, req.params.problemSetId);
            sinon.assert.calledWith(mockRes.status, statusCodes.SERVER_ERROR);
        });

    });

});