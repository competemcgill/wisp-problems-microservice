import mongoose from "mongoose";
import chaiHttp from "chai-http";
import chaiAsPromised from "chai-as-promised";
import chai, { expect } from "chai";
import { app, port } from "../../src/app";
import { Problem, IProblemModel } from "../../src/database/models/problem";
import { IProblem, Difficulty, PlatformName } from "../../src/interfaces/IProblem";
import { IProblemSet } from "../../src/interfaces/IProblemSet";
import { problemDBInteractions } from "../../src/database/interactions/problem";
import { problemSetDBInteractions } from "../../src/database/interactions/problemSet";
import { ProblemSet, IProblemSetModel } from "../../src/database/models/problemSet";

chai.use(chaiHttp);
chai.use(chaiAsPromised);

let server: import("http").Server;
let testProblem: IProblemModel;
let testProblemSet: IProblemSetModel;
let dbUrl = "";
(process.env.DB_URL)
    ? dbUrl = process.env.DB_URL
    : dbUrl = "mongodb://mongo:27017/wisp_test";


describe("Problems controller tests", () => {
    before(async () => {
        await mongoose.connect(dbUrl, {
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true,
            useCreateIndex: true
        });

        await ProblemSet.deleteMany({});
        await Problem.deleteMany({});

        server = app.listen(port);
    });

    beforeEach(async () => {
        const testProblemSetData: IProblemSet = {
            title: "Test Problem Set",
            description: "Test problem set description.",
            tags: ["Dynamic programming", "Test"],
            problemCount: 1
        };

        testProblemSet = await problemSetDBInteractions.create(testProblemSetData);

        const testProblemData: IProblem = {
            title: "Test Problem",
            problemId: "27796f7b6717753aeee14bb4ba2acf6f55c88956",
            source: PlatformName[0],
            sourceLink: "https://codeforces.com/problemset/problem/1/A",
            problemSetIds: [testProblemSet._id],
            problemMetadata: {
                platformProblemId: "1A",
                difficulty: Difficulty[0]
            }
        };

        testProblem = await problemDBInteractions.create(testProblemData);
    });

    afterEach(async () => {
        await ProblemSet.deleteMany({});
        await Problem.deleteMany({});
    });

    after(async () => {
        await mongoose.disconnect();
        server.close();
    });

    describe("GET /users", () => {
        it("status 200: returns successfully a list of 1 problemSet", async () => {
            const { body: problemSets } = await chai.request(app).get("/problemSets");
            expect(problemSets.length).to.equal(1);
            expect(problemSets[0].title).to.equal(testProblemSet.title);
        });
    });
});