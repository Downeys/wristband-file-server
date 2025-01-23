import { guardAgainstNull, guardAgainstNullOrEmpty } from '../../../common/domain/utils/argumentHelpers';
import { MusicSubmissionEntityType, MusicSubmissionFormType } from '../interfaces/submissionInterfaces';
import musicSubmissionEntityValidator from '../validators/musicSubmissionEntityValidator';

export class MusicSubmissionEntity implements MusicSubmissionEntityType {
    form: MusicSubmissionFormType;
    imageFiles: File[];
    audioFiles: File[];
    imageUrls: string[] = [];
    audioUrls: string[] = [];
    validationMessages: string[] = [];
    constructor(form: MusicSubmissionFormType, imageFiles: File[], audioFiles: File[]) {
        this.form = guardAgainstNull(form, 'form');
        this.imageFiles = guardAgainstNullOrEmpty(imageFiles, 'imageFiles');
        this.audioFiles = guardAgainstNullOrEmpty(audioFiles, 'audioFiles');
    }

    isValid = () => {
        const { isValid, validationMessages } = musicSubmissionEntityValidator.isValid(this);
        if (!isValid) this.validationMessages = [...validationMessages, ...this.form.validationMessages];
        return isValid;
    };

    setImageUrls = (urls: string[]) => {
        guardAgainstNullOrEmpty(urls, 'urls');
        this.imageUrls = urls;
    };

    setAudioUrls = (urls: string[]) => {
        guardAgainstNullOrEmpty(urls, 'urls');
        this.audioUrls = urls;
    };
}
