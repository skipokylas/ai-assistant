import { Stack, type StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { DeploymentService } from "./deployment-service";

interface FrontendHostingStackProps extends StackProps {
  stageName: string;
}

export class FrontendHostingStack extends Stack {
  constructor(
    scope: Construct,
    id: string,
    props: FrontendHostingStackProps,
  ) {
    super(scope, id, props);

    new DeploymentService(this, "FrontendDeployment", {
      stageName: props.stageName,
    });
  }
}
