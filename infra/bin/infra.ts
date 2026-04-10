#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import "source-map-support/register";
import { FrontendHostingStack } from "../lib/frontend-hosting-stack";

const app = new cdk.App();

const stageName = app.node.tryGetContext("stage") ?? "dev";
const stackName = `AiAssistant-${stageName}-FrontendHosting`;
const account = process.env.CDK_DEFAULT_ACCOUNT;
const region =
  process.env.CDK_DEFAULT_REGION ?? process.env.AWS_REGION ?? process.env.AWS_DEFAULT_REGION;

const stackProps = {
  stageName,
  ...(account && region
    ? {
        env: {
          account,
          region,
        },
      }
    : {}),
};

new FrontendHostingStack(app, stackName, stackProps);
