import { Document, Model, model, Schema } from "mongoose";
import { IProblem } from "../../interfaces/IProblem";

export interface IProblemModel extends IProblem, Document { }

const problemSchema: Schema = new Schema(
    {
        source: {
            type: String,
            enum: ["CODEFORCES", "OTHER"],
        },
        problemId: {
            type: String,
            index: true
        },
        sourceLink: String,
        problemSetId: {
            type: Schema.Types.ObjectId,
            ref: "Problem"
        },
        problemMetadata: {
            platformProblemId: String
        },
    },
    {
        timestamps: true
    }
);

const Problem: Model<IProblemModel> = model("Problem", problemSchema);

export { Problem };
