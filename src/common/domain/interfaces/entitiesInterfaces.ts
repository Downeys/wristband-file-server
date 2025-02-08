export interface Entity {
  validationMessages: string[];
  isValid: () => boolean;
}
