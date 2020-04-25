import { Request, Response } from "express";
import { problemDBInteractions } from "../database/interactions/problem";
import { Problem, IProblemModel } from "../database/models/problem";
import { IProblem } from "../interfaces/IProblem";
import { validationResult } from "express-validator/check";
import { errorMessage } from "../config/errorFormatter";
import { statusCodes } from "../config/statusCodes";

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

    create: async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(statusCodes.MISSING_PARAMS).json(errors.formatWith(errorMessage).array()[0]);
        } else {
            try {
                const problemData: IProblem = {
                    ...req.body,
                };
                let newProblem: IProblemModel = await problemDBInteractions.create(new Problem(problemData));
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
                const { problemId } = req.params;
                const problem: IProblemModel = await problemDBInteractions.find(problemId);
                if (!problem)
                    res.status(statusCodes.NOT_FOUND).send({ status: statusCodes.NOT_FOUND, message: "Problem not found" });
                else {
                    const updatedProblemBody: IProblem = {
                        ...req.body,
                    };

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
                const { problemId } = req.params;
                const problem: IProblemModel = await problemDBInteractions.find(problemId);
                if (!problem) {
                    res.status(statusCodes.NOT_FOUND).send({ status: statusCodes.NOT_FOUND, message: "Problem not found" });
                } else {
                    await problemDBInteractions.delete(problemId);
                    res.status(statusCodes.SUCCESS).send();
                }
            } catch (error) {
                res.status(statusCodes.SERVER_ERROR).send(error);
            }
        }
    }
};

export { problemController };
