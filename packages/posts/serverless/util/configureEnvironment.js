import dynamoose from "dynamoose";
import logger, {configureLogger} from "../../lib/logger";
import loadServerlessSecrets from "./loadServerlessSecrets";

if (process.env.IS_OFFLINE || process.env.NODE_ENV === "test") {
    dynamoose.local();
}

export default () => {
    return loadServerlessSecrets()
        .then(() => {
            return configureLogger();
        })
        .catch(error => {
            logger.fatal(error, "[configureEnvironment] Unexpected error configuring the lambda environment");
            throw error;
        });
};
