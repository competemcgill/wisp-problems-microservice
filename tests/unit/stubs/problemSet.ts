import {problemSetDBInteractions} from "../../../src/database/interactions/problemSet";
import sinon from "sinon";

export const problemSetDBInteractionsStubs = () => {
    return {
        create : sinon.stub(problemSetDBInteractions, 'create'),
        all : sinon.stub(problemSetDBInteractions, 'all'),
        find : sinon.stub(problemSetDBInteractions, 'find'),
        update : sinon.stub(problemSetDBInteractions, 'update'),
        delete : sinon.stub(problemSetDBInteractions, 'delete'),

        restoreStubs() {
            this.create.restore();
            this.all.restore();
            this.find.restore();
            this.update.restore();
            this.delete.restore();
        }
    }
};