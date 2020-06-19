import { IProblemSet } from "../../interfaces/IProblemSet";
import { ProblemSet, IProblemSetModel } from "../models/problemSet";
import { IProblemModel } from "../models/problem";
import { problemUtil } from "../../util/problem";

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

    updateProblemCount: async (problem: IProblemModel): Promise<void> => {
        return problemUtil.updateProblemCount(problem);
    },

    setProblemCount: (problemSetId: string, problemCount: number) => {
        return ProblemSet.findByIdAndUpdate(problemSetId, {
            $set: { problemCount: problemCount }
        });
    },

    update: (
        problemSetId: string,
        newProblemSet: IProblemSet
    ): Promise<IProblemSetModel> => {
        return ProblemSet.findByIdAndUpdate(problemSetId, newProblemSet, {
            new: true
        }).exec();
    },

    delete: (problemSetId: string): Promise<IProblemSetModel> => {
        return ProblemSet.findByIdAndDelete(problemSetId).exec();
    }
};
