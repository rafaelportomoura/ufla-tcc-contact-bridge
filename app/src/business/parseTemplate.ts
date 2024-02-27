import Handlebars from 'handlebars';

/* eslint-disable no-empty-function */
export class ParseTemplate {
  private compiled_template: HandlebarsTemplateDelegate;

  constructor(private template: string) {
    this.compiled_template = Handlebars.compile(this.template);
  }

  parse(data: Record<string, string>): string {
    return this.compiled_template(data);
  }
}
