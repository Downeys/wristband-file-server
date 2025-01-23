import { Validator, ValidatorConfig } from '../../../common/domain/interfaces/specificationInterfaces';
import { INVALID_FORM, MISSING_IMAGE_FILE, MISSING_SONG_FILE } from '../constants/musicSubmissionValidationMessages';
import { MusicSubmissionEntityType } from '../interfaces/submissionInterfaces';
import { isEveryAudioFileNotNull, isEveryImageFileNotNull, isFormValid } from '../specifications/musicSubmissionEntitySpecifications';

const validatorConfig: ValidatorConfig<MusicSubmissionEntityType> = {
    config: [
        {
            id: 1,
            specification: isFormValid,
            validationMessage: INVALID_FORM,
        },
        {
            id: 2,
            specification: isEveryImageFileNotNull,
            validationMessage: MISSING_IMAGE_FILE,
        },
        {
            id: 3,
            specification: isEveryAudioFileNotNull,
            validationMessage: MISSING_SONG_FILE,
        },
    ],
};

export const musicSubmissionEntityValidator: Validator<MusicSubmissionEntityType> = {
    isValid: (form: MusicSubmissionEntityType) => {
        let validationMessages: string[] = [];
        validatorConfig.config.forEach((item) => {
            if (!item.specification.isSatisfiedBy(form)) {
                validationMessages = [...validationMessages, item.validationMessage];
            }
        });
        return { isValid: validationMessages.length === 0, validationMessages };
    },
};

export default musicSubmissionEntityValidator;
