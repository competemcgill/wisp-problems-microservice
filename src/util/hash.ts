import crypto from "crypto";

export const hash = {
    calculateProblemHash: (platform: string, problemNumber: string) => {
        return crypto
            .createHash("sha1")
            .update(platform + problemNumber)
            .digest("hex");
    }
};
