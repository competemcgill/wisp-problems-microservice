import { ErrorFormatter } from "express-validator/check";

const errorMessage: ErrorFormatter<{}> = ({ location, msg, param }): {} => {
    return {
        status: 422,
        message: `${location}[${param}]: ${msg}`
    };
};

export { errorMessage };