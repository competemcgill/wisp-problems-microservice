import sinon from "sinon";
import { problemSetDBInteractions } from "../../../src/database/interactions/problemSet";

export const problemSetDBInteractionsStubs = () => {
    return {
        create: sinon.stub(problemSetDBInteractions, "create"),
        all: sinon.stub(problemSetDBInteractions, "all"),
        find: sinon.stub(problemSetDBInteractions, "find"),
        update: sinon.stub(problemSetDBInteractions, "update"),
        updateProblemCount: sinon.stub(
            problemSetDBInteractions,
            "updateProblemCount"
        ),
        setProblemCount: sinon.stub(
            problemSetDBInteractions,
            "setProblemCount"
        ),
        delete: sinon.stub(problemSetDBInteractions, "delete"),

        restore() {
            this.create.restore();
            this.all.restore();
            this.find.restore();
            this.update.restore();
            this.updateProblemCount.restore();
            this.setProblemCount.restore();
            this.delete.restore();
        }
    };
};
