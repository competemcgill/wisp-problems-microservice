import { Document, Model, model, Schema } from "mongoose";
import { IProblem } from "../../interfaces/IProblem";

export interface IProblemModel extends IProblem, Document { }

const problemSchema: Schema = new Schema(
    {
        source: {
            type: String,
            enum: ["CODEFORCES", "OTHER"],
        },
        problemID: {
            type: String,
            index: true
        },
        sourceLink: String,
        problemSetID: {
            type: Schema.Types.ObjectId,
            ref: "Problem"
        },
        problemMetadata: {
            platformProblemID: String
        },
    },
    {
        timestamps: true
    }
);

const Problem: Model<IProblemModel> = model("Problem", problemSchema);

export { Problem };
