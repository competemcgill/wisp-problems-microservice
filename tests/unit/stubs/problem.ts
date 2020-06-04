import sinon from "sinon";
import { problemDBInteractions } from "../../../src/database/interactions/problem";

export const problemDBInteractionsStubs = () => {
    return {
        create: sinon.stub(problemDBInteractions, "create"),
        all: sinon.stub(problemDBInteractions, "all"),
        find: sinon.stub(problemDBInteractions, "find"),
        countInProblemSet: sinon.stub(
            problemDBInteractions,
            "countInProblemSet"
        ),
        listByProblemSet: sinon.stub(problemDBInteractions, "listByProblemSet"),
        findByProblemNumberAndPlatform: sinon.stub(
            problemDBInteractions,
            "findByProblemNumberAndPlatform"
        ),
        findByGeneratedId: sinon.stub(
            problemDBInteractions,
            "findByGeneratedId"
        ),
        update: sinon.stub(problemDBInteractions, "update"),
        delete: sinon.stub(problemDBInteractions, "delete"),

        restoreStubs() {
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
