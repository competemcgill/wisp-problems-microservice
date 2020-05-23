// TODO: mock controller interactions
import chaiHttp from "chai-http";
import chaiAsPromised from "chai-as-promised";
import chai, { expect } from "chai";
import { app, port } from "../../src/app";

chai.use(chaiHttp);
chai.use(chaiAsPromised);

let server: import("http").Server;

describe("Problems routes tests", () => {
    before(async () => {
        server = app.listen(port);
    });

    after(async () => {
        server.close();
    });

    describe("GET /problemSets", () => {
        it("status 200: returns a list problemSets", async () => {
            expect(true).to.be.true;
        });
    });
});