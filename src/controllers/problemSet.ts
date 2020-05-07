import { Request, Response } from "express";
import { problemSetDBInteractions } from "../database/interactions/problemSet";
import { ProblemSet, IProblemSetModel } from "../database/models/problemSet";
import { IProblemSet } from "../interfaces/IProblemSet";
import { validationResult } from "express-validator/check";
import { errorMessage } from "../config/errorFormatter";
import { statusCodes } from "../config/statusCodes";

const problemSetController = {

    index: async (req: Request, res: Response) => {
        try {
            const problemSets = await problemSetDBInteractions.all();
            res.status(statusCodes.SUCCESS).send(problemSets);
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
                const problemSetId: string = req.params.problemSetId;
                const problemSet: IProblemSetModel = await problemSetDBInteractions.find(problemSetId);
                problemSet ? res.status(statusCodes.SUCCESS).send(problemSet) : res.status(statusCodes.NOT_FOUND).send({ status: statusCodes.NOT_FOUND, message: "ProblemSet not found" });
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
                const problemSetData: IProblemSet = {
                    ...req.body,
                };
                let newProblemSet: IProblemSetModel = await problemSetDBInteractions.create(new ProblemSet(problemSetData));
                newProblemSet = newProblemSet.toJSON();
                res.status(statusCodes.SUCCESS).send(newProblemSet);
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
                const { problemSetId } = req.params;
                const problemSet: IProblemSetModel = await problemSetDBInteractions.find(problemSetId);
                if (!problemSet)
                    res.status(statusCodes.NOT_FOUND).send({ status: statusCodes.NOT_FOUND, message: "ProblemSet not found" });
                else {
                    const updatedProblemSetBody: IProblemSet = {
                        ...req.body,
                    };

                    const updatedProblemSet: IProblemSetModel = await problemSetDBInteractions.update(problemSetId, updatedProblemSetBody);
                    res.status(statusCodes.SUCCESS).send(updatedProblemSet);
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
                const { problemSetId } = req.params;
                const problemSet: IProblemSetModel = await problemSetDBInteractions.find(problemSetId);
                if (!problemSet) {
                    res.status(statusCodes.NOT_FOUND).send({ status: statusCodes.NOT_FOUND, message: "ProblemSet not found" });
                } else {
                    await problemSetDBInteractions.delete(problemSetId);
                    res.status(statusCodes.SUCCESS).send();
                }
            } catch (error) {
                res.status(statusCodes.SERVER_ERROR).send(error);
            }
        }
    }
};

export { problemSetController };
