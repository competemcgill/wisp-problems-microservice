import sinon from "sinon"
import check from "express-validator/check";

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