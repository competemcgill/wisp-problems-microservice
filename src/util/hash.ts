import crypto from "crypto";

export const calculateProblemHash = (problemNumber: string, platform: string) => {
    return crypto.createHash("sha1").update(problemNumber + platform).digest("hex")
}