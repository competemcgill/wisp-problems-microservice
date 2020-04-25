import { IProblem } from "../../interfaces/IProblem";
import { Problem, IProblemModel } from "../models/problem";

export const problemDBInteractions = {

    create: (problem: IProblem): Promise<IProblemModel> => {
        return Problem.create(problem);
    },

    all: (): Promise<IProblemModel[]> => {
        return Problem.find().exec();
    },

    find: (problemId: string): Promise<IProblemModel> => {
        return Problem.findOne({ _id: problemId }).exec();
    },

    update: (problemId: string, newProblem: IProblem): Promise<IProblemModel> => {
        return Problem.findByIdAndUpdate(problemId, newProblem, { new: true }).exec();
    },

    delete: (problemId: string): Promise<IProblemModel> => {
        return Problem.findByIdAndDelete(problemId).exec();
    },
};