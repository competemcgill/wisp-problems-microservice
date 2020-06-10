import sinon from "sinon"
import { hash } from "../../util/hash";

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