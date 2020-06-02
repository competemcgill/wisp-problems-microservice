import { Request, Response } from "express";
import { problemDBInteractions } from "../database/interactions/problem";
import { Problem, IProblemModel } from "../database/models/problem";
import { IProblem } from "../interfaces/IProblem";
import { validationResult } from "express-validator/check";
import { errorMessage } from "../config/errorFormatter";
import { statusCodes } from "../config/statusCodes";
import { calculateProblemHash } from "../util/hash";
import { problemSetDBInteractions } from "../database/interactions/problemSet";
import { IProblemSetModel } from "../database/models/problemSet";

const problemController = {

    index: async (req: Request, res: Response) => {
        try {
            const problems = await problemDBInteractions.all();
            res.status(statusCodes.SUCCESS).json(problems);
        } catch (err) {
            res.status(statusCodes.SERVER_ERROR).json(err);
        }
    },

    show: async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(statusCodes.MISSING_PARAMS).json(errors.formatWith(errorMessage).array()[0]);
        } else {
            try {
                const { problemId } = req.params;
                const problem: IProblemModel = await problemDBInteractions.find(problemId);
                problem ? res.status(statusCodes.SUCCESS).json(problem) : res.status(statusCodes.NOT_FOUND).json({ status: statusCodes.NOT_FOUND, message: "Problem not found" });
            } catch (error) {
                res.status(statusCodes.SERVER_ERROR).json(error);
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
                problem ? res.status(statusCodes.SUCCESS).json(problem) : res.status(statusCodes.NOT_FOUND).json({ status: statusCodes.NOT_FOUND, message: "Problem not found" });
            } catch (error) {
                res.status(statusCodes.SERVER_ERROR).json(error);
            }
        }
    },

    create: async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(statusCodes.MISSING_PARAMS).json(errors.formatWith(errorMessage).array()[0]);
        } else {
            try {
                const problem = req.body;
                problem.problemMetadata.difficulty = problem.problemMetadata.difficulty.toLowerCase()
                problem.source = problem.source.toUpperCase();

                const platform = problem.source
                let platformProblemId = problem.problemMetadata.platformProblemId
                if (platform == "CODEFORCES") {
                    platformProblemId = platformProblemId.toUpperCase();
                }

                const problemData: IProblem = {
                    ...problem,
                    problemId: calculateProblemHash(platform, platformProblemId)
                };

                let newProblem: IProblemModel = await problemDBInteractions.create(new Problem(problemData));


                for (const problemSetId of newProblem.problemSetIds) {
                    const problemCount: number = await problemDBInteractions.countInProblemSet(problemSetId);
                    const currProblemSet: IProblemSetModel = await problemSetDBInteractions.find(problemSetId);
                    currProblemSet.problemCount = problemCount;
                    await currProblemSet.save();
                }

                newProblem = newProblem.toJSON();
                res.status(statusCodes.SUCCESS).json(newProblem);
            } catch (error) {
                res.status(statusCodes.SERVER_ERROR).json(error);
            }
        }
    },

    update: async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(statusCodes.MISSING_PARAMS).json(errors.formatWith(errorMessage).array()[0]);
        } else {
            try {
                const { problemId } = req.params;
                const problem: IProblemModel = await problemDBInteractions.find(problemId);
                if (!problem)
                    res.status(statusCodes.NOT_FOUND).json({ status: statusCodes.NOT_FOUND, message: "Problem not found" });
                else {
                    let updatedProblemBody: IProblem = {
                        ...req.body,
                        source: req.body.source.toUpperCase()
                    };
                    updatedProblemBody.problemMetadata.difficulty = updatedProblemBody.problemMetadata.difficulty.toLowerCase();

                    let platformProblemId = updatedProblemBody.problemMetadata.platformProblemId
                    const platform = updatedProblemBody.source;
                    if (platform == "CODEFORCES") {
                        platformProblemId = platformProblemId.toUpperCase();
                    }
                    updatedProblemBody.problemId = calculateProblemHash(platform, platformProblemId);

                    for (const problemSetId of problem.problemSetIds) {
                        const problemCount: number = await problemDBInteractions.countInProblemSet(problemSetId);
                        const currProblemSet: IProblemSetModel = await problemSetDBInteractions.find(problemSetId);
                        currProblemSet.problemCount = problemCount;
                        await currProblemSet.save();
                    }

                    const updatedProblem: IProblemModel = await problemDBInteractions.update(problemId, updatedProblemBody);
                    res.status(statusCodes.SUCCESS).json(updatedProblem);
                }
            } catch (error) {
                res.status(statusCodes.SERVER_ERROR).json(error);
            }
        }
    },

    delete: async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(statusCodes.MISSING_PARAMS).json(errors.formatWith(errorMessage).array()[0]);
        } else {
            try {
                const { problemId } = req.params;
                const problem: IProblemModel = await problemDBInteractions.find(problemId);
                if (!problem) {
                    res.status(statusCodes.NOT_FOUND).json({ status: statusCodes.NOT_FOUND, message: "Problem not found" });
                } else {
                    const deletedProblem: IProblemModel = await problemDBInteractions.delete(problemId);
                    for (const problemSetId of problem.problemSetIds) {
                        const problemCount: number = await problemDBInteractions.countInProblemSet(problemSetId);
                        const currProblemSet: IProblemSetModel = await problemSetDBInteractions.find(problemSetId);
                        currProblemSet.problemCount = problemCount;
                        await currProblemSet.save();
                    }
                    res.status(statusCodes.SUCCESS).json();
                }
            } catch (error) {
                res.status(statusCodes.SERVER_ERROR).json(error);
            }
        }
    }
};

export { problemController };
