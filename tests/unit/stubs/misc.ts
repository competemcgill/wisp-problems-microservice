import sinon from "sinon"
import check from "express-validator/check";
import { hash } from "../../../src/util/hash";

export const validatorStubs = () => {
    return {
        validationResult: sinon.stub(check, "validationResult"),

        restore() {
            this.validationResult.restore();
        }
    };
};

export const emptyValidationError = () => {
    return {
        isEmpty() {
            return true;
        }
    }
};

export const validationErrorWithMessage = (errorMsg: { status: number; message: string }) => {
    return {
        isEmpty() {
            return false;
        },
        formatWith() {
            return {
                array() {
                    return [errorMsg];
                }
            };
        }
    };
}

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