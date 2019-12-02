export interface FormComponentMapping {
  component: any;
}

export abstract class FormComponentConfig {
  [_: string]: FormComponentMapping;
}

export interface ValidationMapping {
  function: any;
}

export abstract class ValidationConfig {
  [_: string]: ValidationMapping;
}

export abstract class FormConfig {
  components: FormComponentConfig;
  validations?: ValidationConfig;
}
