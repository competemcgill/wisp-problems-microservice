import { Document, Model, model, Schema } from "mongoose";
import { IProblem } from "../../interfaces/IProblem";

export interface IProblemModel extends IProblem, Document { }

const problemSchema: Schema = new Schema({
    stuff: String
},
    {
        timestamps: true
    }
);

const Problem: Model<IProblemModel> = model("Problem", problemSchema);

export { Problem };
