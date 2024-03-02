import { aws_config } from '../aws/config';
import { SES } from '../aws/ses';
import { GetTemplateArgs } from '../types/GetTemplate';
import { ListTemplateRequest, ListTemplateResponse } from '../types/ListTemplate';

export class ListTemplate {
  private ses: SES;

  constructor({ aws_params }: GetTemplateArgs) {
    this.ses = new SES(aws_config(aws_params));
  }

  async paginated(input: ListTemplateRequest): Promise<ListTemplateResponse> {
    const { TemplatesMetadata: templates } = await this.ses.listPaginatedTemplates(input);
    return { templates };
  }
}
