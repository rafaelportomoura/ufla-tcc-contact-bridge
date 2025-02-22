from scripts.typescript import Typescript
from scripts.cloudformation import CloudFormation
from scripts.args import get_args
from stacks import network
from scripts.exception import DeployException

args = get_args(
    {
        "stage": {"type": "str", "required": False, "default": "prod"},
        "microservice": {"type": "str", "required": False, "default": "contact-bridges"},
        "tenant": {"type": "str", "required": False, "default": "tcc"},
        "region": {"type": "str", "required": False, "default": "us-east-2"},
        "profile": {"type": "str", "required": False, "default": "default"},
        "log_level": {"type": "int", "required": False, "default": 3},
        "authorizer_result_ttl_in_seconds": {
            "type": "int",
            "required": False,
            "default": 300,
        },
        "log_level_compute": {"type": "str", "required": False, "default": "debug"},
    }
)

microservice = args["microservice"]
stage = args["stage"]
tenant = args["tenant"]
region = args["region"]
profile = args["profile"]
log_level = args["log_level"]

cloudformation = CloudFormation(profile=profile, region=region, log_level=log_level)
typescript = Typescript(log_level=log_level)


################################################
# 🚀 NETWORK STACK
################################################
NETWORK_STACK = network.stack(
    stage=stage,
    tenant=tenant,
    microservice=microservice
)

typescript.build()
typescript.lambda_packages()
cloudformation.package_and_deploy_stack(stack=NETWORK_STACK, output="stacks/output.yaml")

if not cloudformation.stack_is_succesfully_deployed(stack_name=NETWORK_STACK["stack_name"]):
    raise DeployException(stack=NETWORK_STACK)