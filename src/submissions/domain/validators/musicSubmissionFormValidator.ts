import { Validator, ValidatorConfig } from '../../../common/domain/interfaces/specificationInterfaces';
import { INVALID_CONTACT_NAME, INVALID_EMAIL, INVALID_PHONE, MISSING_ATTESTATION } from '../constants/musicSubmissionValidationMessages';
import { MusicSubmissionFormType } from '../interfaces/submissionInterfaces';
import { isContactNameValid, isEmailValid, isPhoneValid, isAttestationChecked } from '../specifications/musicSubmissionFormSpecifications';

const validatorConfig: ValidatorConfig<MusicSubmissionFormType> = {
    config: [
        {
            id: 1,
            specification: isContactNameValid,
            validationMessage: INVALID_CONTACT_NAME,
        },
        {
            id: 2,
            specification: isEmailValid,
            validationMessage: INVALID_EMAIL,
        },
        {
            id: 3,
            specification: isPhoneValid,
            validationMessage: INVALID_PHONE,
        },
        {
            id: 4,
            specification: isAttestationChecked,
            validationMessage: MISSING_ATTESTATION,
        },
    ],
};

export const musicSubmissionFormValidator: Validator<MusicSubmissionFormType> = {
    isValid: (form: MusicSubmissionFormType) => {
        let validationMessages: string[] = [];
        validatorConfig.config.forEach((item) => {
            if (!item.specification.isSatisfiedBy(form)) {
                validationMessages = [...validationMessages, item.validationMessage];
            }
        });
        return { isValid: validationMessages.length === 0, validationMessages };
    },
};

export default musicSubmissionFormValidator;
