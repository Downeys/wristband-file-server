export interface Specification<T> {
    isSatisfiedBy: (entity: T) => boolean;
}

export interface ValidatorConfigItem<T> {
    id: number;
    specification: Specification<T>;
    validationMessage: string;
}

export interface ValidatorConfig<T> {
    config: ValidatorConfigItem<T>[];
}

export interface IsValidResponse {
    isValid: boolean;
    validationMessages: string[];
}

export interface Validator<T> {
    isValid: (form: T) => IsValidResponse;
}
