import { Specification } from '../../../common/domain/interfaces/specificationInterfaces';
import { MusicSubmissionEntityType } from '../interfaces/submissionInterfaces';

export const isEveryAudioFileNotNull: Specification<MusicSubmissionEntityType> = {
    isSatisfiedBy: (form: MusicSubmissionEntityType) => {
        const nullFiles = form.audioFiles.filter((file) => !file);
        return nullFiles.length === 0;
    },
};

export const isEveryImageFileNotNull: Specification<MusicSubmissionEntityType> = {
    isSatisfiedBy: (form: MusicSubmissionEntityType) => {
        const nullFiles = form.imageFiles.filter((file) => !file);
        return nullFiles.length === 0;
    },
};

export const isFormValid: Specification<MusicSubmissionEntityType> = {
    isSatisfiedBy: (form: MusicSubmissionEntityType) => form.form.isValid(),
};
