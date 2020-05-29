import {Request, Response} from "express";
import {problemDBInteractions} from "../database/interactions/problem";
import {IProblemModel, Problem} from "../database/models/problem";
import {IProblem} from "../interfaces/IProblem";
import {validationResult} from "express-validator/check";
import {errorMessage} from "../config/errorFormatter";
import {statusCodes} from "../config/statusCodes";
import {calculateProblemHash} from "../util/hash";
import {problemSetDBInteractions} from "../database/interactions/problemSet";
import {IProblemSetModel} from "../database/models/problemSet";

const problemController = {

    index: async (req: Request, res: Response) => {
        try {
            const problems = await problemDBInteractions.all();
            res.status(statusCodes.SUCCESS).send(problems);
        } catch (err) {
            res.status(statusCodes.SERVER_ERROR).send(err);
        }
    },

    show: async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(statusCodes.MISSING_PARAMS).json(errors.formatWith(errorMessage).array()[0]);
        } else {
            try {
                const problemId: string = req.params.problemId;
                const problem: IProblemModel = await problemDBInteractions.find(problemId);
                problem ? res.status(statusCodes.SUCCESS).send(problem) : res.status(statusCodes.NOT_FOUND).send({ status: statusCodes.NOT_FOUND, message: "Problem not found" });
            } catch (error) {
                res.status(statusCodes.SERVER_ERROR).send(error);
            }
        }
    },

    exists: async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(statusCodes.MISSING_PARAMS).json(errors.formatWith(errorMessage).array()[0]);
        } else {
            try {
                const generatedProblemId: string = req.params.generatedProblemId;
                const problem: IProblemModel = await problemDBInteractions.findByGeneratedId(generatedProblemId);
                problem ? res.status(statusCodes.SUCCESS).send(problem) : res.status(statusCodes.NOT_FOUND).send({ status: statusCodes.NOT_FOUND, message: "Problem not found" });
            } catch (error) {
                res.status(statusCodes.SERVER_ERROR).send(error);
            }
        }
    },

    create: async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(statusCodes.MISSING_PARAMS).json(errors.formatWith(errorMessage).array()[0]);
        } else {
            try {
                let platformProblemId = req.body.problemMetadata.platformProblemId
                const platform = req.body.source.toUpperCase()
                if (platform == "CODEFORCES") {
                    platformProblemId = platformProblemId.toUpperCase();
                }
                // TODO: add verification that the fields within the Object problemMetadata are present
                const problemData: IProblem = {
                    ...req.body,
                    problemId: calculateProblemHash(platform, platformProblemId)
                };
                let newProblem: IProblemModel = await problemDBInteractions.create(new Problem(problemData));


                for (const problemSetId of newProblem.problemSetIds) {
                    const problemCount: number = await problemDBInteractions.countInProblemSet(problemSetId);
                    let currProblemSet: IProblemSetModel = await problemSetDBInteractions.find(problemSetId);
                    currProblemSet.problemCount = problemCount;
                    currProblemSet.save();
                }

                newProblem = newProblem.toJSON();
                res.status(statusCodes.SUCCESS).send(newProblem);
            } catch (error) {
                res.status(statusCodes.SERVER_ERROR).send(error);
            }
        }
    },

    update: async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(statusCodes.MISSING_PARAMS).json(errors.formatWith(errorMessage).array()[0]);
        } else {
            try {
                const problemId: string  = req.params.problemId;
                const problem: IProblemModel = await problemDBInteractions.find(problemId);
                if (!problem)
                    res.status(statusCodes.NOT_FOUND).send({ status: statusCodes.NOT_FOUND, message: "Problem not found" });
                else {

                    let updatedProblemBody: IProblem = {
                        ...req.body,
                    };


                    if (req.body.source && req.body.problemMetadata && req.body.problemMetadata.platformProblemId) {
                        let platformProblemId = req.body.problemMetadata.platformProblemId
                        const platform = req.body.source.toUpperCase()
                        if (platform == "CODEFORCES") {
                            platformProblemId = platformProblemId.toUpperCase();
                        }
                        updatedProblemBody.problemId = calculateProblemHash(platform, platformProblemId);
                    }

                    for (const problemSetId of problem.problemSetIds) {
                        const problemCount: number = await problemDBInteractions.countInProblemSet(problemSetId);
                        let currProblemSet: IProblemSetModel = await problemSetDBInteractions.find(problemSetId);
                        currProblemSet.problemCount = problemCount;
                        currProblemSet.save();
                    }

                    const updatedProblem: IProblemModel = await problemDBInteractions.update(problemId, updatedProblemBody);
                    res.status(statusCodes.SUCCESS).send(updatedProblem);
                }
            } catch (error) {
                res.status(statusCodes.SERVER_ERROR).send(error);
            }
        }
    },

    delete: async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(statusCodes.MISSING_PARAMS).json(errors.formatWith(errorMessage).array()[0]);
        } else {
            try {
                const problemId = req.params.problemId;
                const problem: IProblemModel = await problemDBInteractions.find(problemId);
                if (!problem) {
                    res.status(statusCodes.NOT_FOUND).send({ status: statusCodes.NOT_FOUND, message: "Problem not found" });
                } else {
                    const deletedProblem: IProblemModel = await problemDBInteractions.delete(problemId);
                    for (const problemSetId of problem.problemSetIds) {
                        const problemCount: number = await problemDBInteractions.countInProblemSet(problemSetId);
                        let currProblemSet: IProblemSetModel = await problemSetDBInteractions.find(problemSetId);
                        currProblemSet.problemCount = problemCount;
                        currProblemSet.save();
                    }
                    res.status(statusCodes.SUCCESS).send();
                }
            } catch (error) {
                res.status(statusCodes.SERVER_ERROR).send(error);
            }
        }
    }
};

export { problemController };
