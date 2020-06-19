import { errorMessage } from "../../../src/config/errorFormatter";
import { expect } from "chai";

describe("Error formatter tests", () => {
    it("Formats error messages with status 422", () => {
        const location: any = "body";
        const actual = errorMessage({
            location: location,
            msg: "Invalid or missing 'email'",
            param: "email"
        });
        expect(actual).to.deep.equal({
            status: 422,
            message: "body[email]: Invalid or missing 'email'"
        });
    });
});
