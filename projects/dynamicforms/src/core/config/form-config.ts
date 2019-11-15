export interface FormComponentMapping {
  component: any;
}

export abstract class FormComponentConfig {
  [_: string]: FormComponentMapping;
}

export abstract class FormConfig {
  components: FormComponentConfig;
}
