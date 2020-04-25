import * as bcrypt from "bcryptjs";

export const bcryptPassword = {
    generateHash: (password: string): string => {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    },

    validate: (original: string, toCompare: string): boolean => {
        return bcrypt.compareSync(original, toCompare);
    }
};