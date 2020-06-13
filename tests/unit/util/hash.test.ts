import { hash } from "../../../src/util/hash";
import {
    testProblemModel1,
    testProblem1,
    testProblem2,
    testProblemModel2
} from "../../util/sampleData";
import { assert } from "chai";

describe("Problems controller tests", () => {
    describe("Hash util", () => {
        describe("calculateProblemHash properly generates a hash given valid inputs", () => {
            assert.equal(
                hash.calculateProblemHash(
                    testProblem1.source,
                    testProblem1.problemMetadata.platformProblemId
                ),
                testProblemModel1.problemId
            );

            assert.equal(
                hash.calculateProblemHash(
                    testProblem2.source,
                    testProblem2.problemMetadata.platformProblemId
                ),
                testProblemModel2.problemId
            );

            assert.notEqual(
                hash.calculateProblemHash(
                    testProblem2.source,
                    testProblem2.problemMetadata.platformProblemId
                ),
                testProblemModel1.problemId
            );
        });
    });
});
