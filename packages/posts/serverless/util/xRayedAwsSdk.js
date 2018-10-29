import http from "http";
import AwsXRay from "aws-xray-sdk";
import Aws from "aws-sdk";
import logger from "../../lib/logger";

Aws.Config.logger = logger;
AwsXRay.setLogger(logger);
AwsXRay.captureHTTPsGlobal(http);

export const XRayedAwsSdk = AwsXRay.captureAWS(Aws);

export default XRayedAwsSdk;