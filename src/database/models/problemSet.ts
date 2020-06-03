import { Document, Model, model, Schema } from 'mongoose';
import { IProblemSet } from '../../interfaces/IProblemSet';

export interface IProblemSetModel extends IProblemSet, Document {}

const problemSetSchema: Schema = new Schema(
    {
        title: String,
        description: String,
        tags: {
            type: [String],
        },
        problemCount: Number,
    },
    {
        timestamps: true,
    },
);

const ProblemSet: Model<IProblemSetModel> = model('ProblemSet', problemSetSchema);

export { ProblemSet };
