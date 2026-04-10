import {
  aws_cloudfront,
  aws_cloudfront_origins,
  aws_s3,
  aws_s3_deployment,
  CfnOutput,
  RemovalPolicy,
  Stack,
} from "aws-cdk-lib";
import { Construct } from "constructs";
import * as path from "node:path";

interface DeploymentServiceProps {
  stageName: string;
}

export class DeploymentService extends Construct {
  constructor(scope: Construct, id: string, props: DeploymentServiceProps) {
    super(scope, id);

    const isProd = props.stageName === "prod";
    const stack = Stack.of(this);
    const frontendBucketName = `ai-assistant-${props.stageName}-frontend-${stack.account}-${stack.region}`;
    const frontendBuildPath = path.resolve(
      __dirname,
      "../../frontend/dist/frontend-app/browser",
    );

    const hostingBucket = new aws_s3.Bucket(this, "FrontendBucket", {
      bucketName: frontendBucketName,
      blockPublicAccess: aws_s3.BlockPublicAccess.BLOCK_ALL,
      enforceSSL: true,
      removalPolicy: isProd ? RemovalPolicy.RETAIN : RemovalPolicy.DESTROY,
      autoDeleteObjects: !isProd,
    });

    const distribution = new aws_cloudfront.Distribution(
      this,
      "CloudFrontDistribution",
      {
        defaultBehavior: {
          origin:
            aws_cloudfront_origins.S3BucketOrigin.withOriginAccessControl(
              hostingBucket,
            ),
          viewerProtocolPolicy:
            aws_cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        },
        defaultRootObject: "index.html",
        errorResponses: [
          {
            httpStatus: 403,
            responseHttpStatus: 200,
            responsePagePath: "/index.html",
          },
          {
            httpStatus: 404,
            responseHttpStatus: 200,
            responsePagePath: "/index.html",
          },
        ],
      },
    );

    new aws_s3_deployment.BucketDeployment(this, "BucketDeployment", {
      sources: [aws_s3_deployment.Source.asset(frontendBuildPath)],
      destinationBucket: hostingBucket,
      distribution,
      distributionPaths: ["/*"],
    });

    new CfnOutput(this, "FrontendUrl", {
      value: `https://${distribution.distributionDomainName}`,
      description: "The CloudFront URL for the frontend.",
    });

    new CfnOutput(this, "FrontendBucketName", {
      value: hostingBucket.bucketName,
      description: "The S3 bucket hosting static frontend assets.",
    });
  }
}
