import sinon from "sinon";
import axios from "axios";
import { hash } from "../../../src/util/hash";
import { problemUtil } from "../../../src/util/problem";

export const problemUtilStubs = () => {
    return {
        calculateProblemHash: sinon.stub(hash, "calculateProblemHash"),
        updateProblemCount: sinon.stub(problemUtil, "updateProblemCount"),

        restore() {
            this.calculateProblemHash.restore();
            this.updateProblemCount.restore();
        }
    };
};

export const axiosStubs = () => {
    return {
        patch: sinon.stub(axios, "patch"),

        restore() {
            this.patch.restore();
        }
    };
};
