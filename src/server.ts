import { app, port } from "./app";
import mongoose from "mongoose";
import { logger } from "./config/logger"


let dbUrl = "";
(process.env.DB_URL)
    ? dbUrl = process.env.DB_URL
    : dbUrl = "mongodb://mongo:27017/wisp";


mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true
});
mongoose.set("useCreateIndex", true);

const server = app.listen(port, async () => {
    logger.info(`Server listening on port ${port} ...`);
});

export { server };
