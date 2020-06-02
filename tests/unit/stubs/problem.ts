import sinon from "sinon";
import check from "express-validator/check";
import { problemDBInteractions } from "../../../src/database/interactions/problem";
import { hash } from "../../../src/util/hash";

export const problemDBInteractionsStubs = () => {
    return {
        create: sinon.stub(problemDBInteractions, "create"),
        all: sinon.stub(problemDBInteractions, "all"),
        find: sinon.stub(problemDBInteractions, "find"),
        countInProblemSet: sinon.stub(problemDBInteractions, "countInProblemSet"),
        listByProblemSet: sinon.stub(problemDBInteractions, "listByProblemSet"),
        findByProblemNumberAndPlatform: sinon.stub(problemDBInteractions, "findByProblemNumberAndPlatform"),
        findByGeneratedId: sinon.stub(problemDBInteractions, "findByGeneratedId"),
        update: sinon.stub(problemDBInteractions, "update"),
        delete: sinon.stub(problemDBInteractions, "delete"),

        restore() {
            this.create.restore();
            this.all.restore();
            this.find.restore();
            this.countInProblemSet.restore();
            this.listByProblemSet.restore();
            this.findByProblemNumberAndPlatform.restore();
            this.findByGeneratedId.restore();
            this.update.restore();
            this.delete.restore();
        }
    };
};

export const validatorStubs = () => {
    return {
        validationResult: sinon.stub(check, "validationResult"),

        restore() {
            this.validationResult.restore();
        }
    };
};

export const problemUtilStubs = () => {
    return {
        hash: {
            calculateProblemHash: sinon.stub(hash, "calculateProblemHash")
        },

        restore() {
            this.hash.calculateProblemHash.restore();
        }
    }
}