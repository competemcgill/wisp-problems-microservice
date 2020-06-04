import sinon from "sinon";
import { problemSetDBInteractionsStubs } from "../stubs/problemSet";
import { problemDBInteractionsStubs } from "../stubs/problem";

let problemDBStubs;
let problemSetDBStubs;

describe("Problem sets controller tests", () => {
    before(() => {
        problemDBStubs = problemDBInteractionsStubs();
        problemSetDBStubs = problemSetDBInteractionsStubs();
    });

    afterEach(() => {
        sinon.reset();
    });

    after(() => {
        problemDBStubs.restoreStubs();
        problemSetDBStubs.restoreStubs();
    });

    describe("PROBLEM SETS: list", () => {
        it("status 200: returns successfully a list of a single tests problem set", async () => {
            // TODO: Write tests here
        });
    });
});
