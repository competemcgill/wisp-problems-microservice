import { Request, Response } from "express";
import { problemDBInteractions } from "../database/interactions/problem";
import { IProblemModel } from "../database/models/problem";
import { IProblem } from "../interfaces/IProblem";
import { validationResult } from "express-validator/check";
import { errorMessage } from "../config/errorFormatter";
import { statusCodes } from "../config/statusCodes";
import { hash } from "../util/hash";
import { problemSetDBInteractions } from "../database/interactions/problemSet";

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
            res.status(statusCodes.MISSING_PARAMS).json(
                errors.formatWith(errorMessage).array()[0]
            );
        } else {
            try {
                const { problemId } = req.params;
                const problem: IProblemModel = await problemDBInteractions.find(
                    problemId
                );
                problem
                    ? res.status(statusCodes.SUCCESS).json(problem)
                    : res.status(statusCodes.NOT_FOUND).json({
                          status: statusCodes.NOT_FOUND,
                          message: "Problem not found"
                      });
            } catch (error) {
                res.status(statusCodes.SERVER_ERROR).json(error);
            }
        }
    },

    exists: async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(statusCodes.MISSING_PARAMS).json(
                errors.formatWith(errorMessage).array()[0]
            );
        } else {
            try {
                const generatedProblemId: string =
                    req.params.generatedProblemId;
                const problem: IProblemModel = await problemDBInteractions.findByGeneratedId(
                    generatedProblemId
                );
                problem
                    ? res.status(statusCodes.SUCCESS).json(problem)
                    : res.status(statusCodes.NOT_FOUND).json({
                          status: statusCodes.NOT_FOUND,
                          message: "Problem not found"
                      });
            } catch (error) {
                res.status(statusCodes.SERVER_ERROR).json(error);
            }
        }
    },

    create: async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(statusCodes.MISSING_PARAMS).json(
                errors.formatWith(errorMessage).array()[0]
            );
        } else {
            try {
                const problem = req.body;
                problem.problemMetadata.difficulty = problem.problemMetadata.difficulty.toLowerCase();
                problem.source = problem.source.toUpperCase();

                const platform = problem.source;
                let platformProblemId =
                    problem.problemMetadata.platformProblemId;
                if (platform == "CODEFORCES") {
                    platformProblemId = platformProblemId.toUpperCase();
                }

                const problemData: IProblem = {
                    ...problem,
                    problemId: hash.calculateProblemHash(
                        platform,
                        platformProblemId
                    )
                };

                const newProblem: IProblemModel = await problemDBInteractions.create(
                    problemData
                );

                await problemSetDBInteractions.updateProblemCount(newProblem);

                res.status(statusCodes.SUCCESS).json(newProblem);
            } catch (error) {
                res.status(statusCodes.SERVER_ERROR).json(error);
            }
        }
    },

    update: async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(statusCodes.MISSING_PARAMS).json(
                errors.formatWith(errorMessage).array()[0]
            );
        } else {
            try {
                const { problemId } = req.params;
                const problem: IProblemModel = await problemDBInteractions.find(
                    problemId
                );
                if (!problem)
                    res.status(statusCodes.NOT_FOUND).json({
                        status: statusCodes.NOT_FOUND,
                        message: "Problem not found"
                    });
                else {
                    const updatedProblemBody: IProblem = {
                        ...req.body,
                        source: req.body.source.toUpperCase()
                    };
                    updatedProblemBody.problemMetadata.difficulty = updatedProblemBody.problemMetadata.difficulty.toLowerCase();

                    let platformProblemId =
                        updatedProblemBody.problemMetadata.platformProblemId;
                    const platform = updatedProblemBody.source;
                    if (platform == "CODEFORCES") {
                        platformProblemId = platformProblemId.toUpperCase();
                    }

                    updatedProblemBody.problemId = hash.calculateProblemHash(
                        platform,
                        platformProblemId
                    );

                    const updatedProblem: IProblemModel = await problemDBInteractions.update(
                        problemId,
                        updatedProblemBody
                    );

                    await problemSetDBInteractions.updateProblemCount(
                        updatedProblem
                    );

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
            res.status(statusCodes.MISSING_PARAMS).json(
                errors.formatWith(errorMessage).array()[0]
            );
        } else {
            try {
                const { problemId } = req.params;
                const problem: IProblemModel = await problemDBInteractions.find(
                    problemId
                );
                if (!problem) {
                    res.status(statusCodes.NOT_FOUND).json({
                        status: statusCodes.NOT_FOUND,
                        message: "Problem not found"
                    });
                } else {
                    await problemDBInteractions.delete(problemId);
                    await problemSetDBInteractions.updateProblemCount(problem);
                    res.status(statusCodes.SUCCESS).json();
                }
            } catch (error) {
                res.status(statusCodes.SERVER_ERROR).json(error);
            }
        }
    }
};

export { problemController };
