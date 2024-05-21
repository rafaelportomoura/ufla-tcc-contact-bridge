from scripts.typescript import Typescript
from scripts.cloudformation import CloudFormation
from scripts.args import get_args
from stacks import lambdas
from scripts.exception import DeployException

args = get_args(
    {
        "stage": {"type": "str", "required": False, "default": "prod"},
        "microservice": {"type": "str", "required": False, "default": "contact-bridges"},
        "tenant": {"type": "str", "required": False, "default": "tcc"},
        "region": {"type": "str", "required": False, "default": "us-east-2"},
        "profile": {"type": "str", "required": False, "default": "default"},
        "log_level": {"type": "int", "required": False, "default": 3},
        "log_level_compute": {"type": "str", "required": False, "default": "debug"},
        "default_email": { "type": "str", "required": True }
    }
)

microservice = args["microservice"]
stage = args["stage"]
tenant = args["tenant"]
region = args["region"]
profile = args["profile"]
log_level = args["log_level"]
default_email = args["default_email"]

cloudformation = CloudFormation(profile=profile, region=region, log_level=log_level)
typescript = Typescript(log_level=log_level)

################################################
# 🚀 LAMBDAS STACK
################################################
exports = cloudformation.list_exports()
key_arn = cloudformation.get_export_value(exports=exports, name=f"{stage}-{tenant}-encrypt-key-arn")

LAMBDAS_STACK = lambdas.stack(
    stage=stage,
    tenant=tenant,
    microservice=microservice,
    log_level=args["log_level_compute"],
    key_arn=key_arn,
    default_email=default_email
)

typescript.build(dev_install="pnpm install --silent")
typescript.lambda_packages()
cloudformation.package_and_deploy_stack(stack=LAMBDAS_STACK, output="stacks/output.yaml")

if not cloudformation.stack_is_succesfully_deployed(stack_name=LAMBDAS_STACK["stack_name"]):
    raise DeployException(stack=LAMBDAS_STACK)