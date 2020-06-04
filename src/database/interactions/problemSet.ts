import { IProblemSet } from "../../interfaces/IProblemSet";
import { ProblemSet, IProblemSetModel } from "../models/problemSet";

export const problemSetDBInteractions = {
    create: (problemSet: IProblemSet): Promise<IProblemSetModel> => {
        return ProblemSet.create(problemSet);
    },

    all: (): Promise<IProblemSetModel[]> => {
        return ProblemSet.find().exec();
    },

    find: (problemSetId: string): Promise<IProblemSetModel> => {
        return ProblemSet.findOne({ _id: problemSetId }).exec();
    },

    update: (
        problemSetId: string,
        newProblemSet: IProblemSet
    ): Promise<IProblemSetModel> => {
        return ProblemSet.findByIdAndUpdate(problemSetId, newProblemSet, {
            new: true,
        }).exec();
    },

    delete: (problemSetId: string): Promise<IProblemSetModel> => {
        return ProblemSet.findByIdAndDelete(problemSetId).exec();
    },
};
