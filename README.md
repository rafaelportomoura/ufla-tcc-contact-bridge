# :newspaper: ContactBridges

Este repositório contém o código do microsserviço de *ContactBridges* do projeto [`CompraVirtual`][compravirtual].  
O microsserviço é responsável pelo gerenciamento de notificações e para cumprir essa responsabilidade, o mesmo possui as seguintes funcionalidades:

- Envio de emails
- Obtenção de chave pública utilizada no encriptação de propriedades

## :computer: Tecnologias Utilizadas

- [Node.js v20.x][node]: é uma plataforma de desenvolvimento JavaScript que permite criar aplicativos do lado do servidor.
  
- [TypeScript v5.2.2][typescript]: é um superset tipado de JavaScript que fornece verificação de tipos estática para facilitar o desenvolvimento e manutenção do código.

- [Python][python]: linguagem de programação, foi utilizado para os scripts de deploy

- [Docker][docker]: uma plataforma de código aberto que automatiza a implantação de aplicativos dentro de contêineres de software, proporcionando portabilidade e consistência em diferentes ambientes de desenvolvimento e produção.

- [Aws Lambda][lambda]: é um serviço de computação que executa o código em resposta a eventos e gerencia automaticamente os recursos de computação

- [Amazon Simple Queue Service (SQS)][sqs]: permite enviar, armazenar e receber mensagens entre componentes de software em qualquer volume, sem perder mensagens ou precisar que outros serviços estejam disponíveis.

- [AWS App Mesh][appmesh]: fornece rede em nível de aplicação para que os serviços possam se comunicar em vários tipos de infraestrutura de computação.

- [AWS Cloud Map][cloudmap]: permite nomear e descobrir os recursos de nuvem.

- [Amazon Elastic Container Registry (Amazon ECR)][ecr]: é um registro de contêiner totalmente gerenciado que oferece hospedagem para que possa implantar imagens e artefatos de aplicações de forma confiável em qualquer lugar.
  
- [Amazon Elastic Container Service (ECS)][ecs]: é um serviço totalmente gerenciado de orquestração de contêineres que ajuda a implantar, gerenciar e escalar aplicações em contêineres de maneira mais eficiente.

- [Amazon CloudWatch][cloudwatch]: é um serviço que monitora aplicações, responde às mudanças de desempenho, otimiza o uso de recursos e fornece insights sobre a integridade operacional.

- [AWS CloudFormation][cloudformation]: permite modelar, provisionar e gerenciar recursos da AWS e de terceiros ao tratar a infraestrutura como código.

## :computer: Tecnologias definidas no repositório de [infra][infra]

- [AWS Auto Scaling][autoscaling]: monitora os aplicativos e ajusta automaticamente a capacidade para manter um desempenho constante e previsível pelo menor custo possível.

- [Amazon Simple Notification Service (SES)][ses]: é um serviço que permite alcançar clientes com confiança sem um servidor de e-mail on-premises do Simple Mail Transfer Protocol (SMTP) usando a API do Amazon SES ou a interface SMTP.

- [Amazon Virtual Private Cloud (VPC)][vpc]: é um serviço da AWS que permite que uma seção isolada da nuvem da Amazon seja provisionada, onde recursos da AWS podem ser lançados em uma rede virtual definida pelo usuário.

- [AWS Route53][route53]: é um serviço da Web de Sistema de Nomes de Domínio (DNS) altamente disponível e escalável.

- [AWS Certificate Manager (ACM)][certificate-manager]: Serviço utilizado para provisionar, gerenciar e implantar certificados SSL/TLS públicos e privados para uso com serviços da AWS e recursos internos conectados.

- [AWS Key Management Service (AWS KMS)][kms]: é um serviço para criar, gerenciar e controlar chaves criptográficas nas aplicações e serviços da AWS.

## :scroll: Autores

 | [<img src="https://github.com/rafaelportomoura.png" width=115><br><sub>Rafael Moura</sub>](https://github.com/rafaelportomoura) <br><sub>Aluno de Graduação</sub>| [<img src="https://github.com/rterrabh.png" width=115><br><sub>Ricardo Terra</sub>](https://github.com/rterrabh) <br><sub>Orientador</sub>|
| :---: | :---: |

## :ticket: Licença

Este repositório é distribuído sob a Licença MIT. Consulte o arquivo [LICENSE](./LICENSE) para obter detalhes.

<!--
LINKS
-->
[compravirtual]: https://github.com/rafaelportomoura/ufla-tcc
[node]: https://nodejs.org/
[infra]: https://github.com/rafaelportomoura/ufla-tcc-infra
[typescript]: https://www.typescriptlang.org/
[lambda]: https://aws.amazon.com/pt/lambda
[sqs]: https://aws.amazon.com/sqs
[ses]: https://aws.amazon.com/ses
[appmesh]: https://aws.amazon.com/app-mesh
[cloudmap]: https://docs.aws.amazon.com/cloud-map/
[ecr]: https://aws.amazon.com/ecr
[ecs]: https://aws.amazon.com/ecs
[cloudwatch]: https://aws.amazon.com/cloudwatch
[vpc]: https://aws.amazon.com/vpc
[cloudformation]: https://aws.amazon.com/cloudformation
[python]: https://www.python.org/
[docker]: https://www.docker.com/
[autoscaling]: https://aws.amazon.com/autoscaling
[route53]: https://aws.amazon.com/route53
[certificate-manager]: https://aws.amazon.com/certificate-manager
[kms]: https://aws.amazon.com/kms