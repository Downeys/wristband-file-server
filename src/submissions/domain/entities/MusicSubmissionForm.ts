import musicSubmissionFormValidator from '../validators/musicSubmissionFormValidator';
import { MusicSubmissionFormType } from '../interfaces/submissionInterfaces';
import { guardAgainstNullOrEmpty } from '../../../common/domain/utils/argumentHelpers';

export class MusicSubmissionForm implements MusicSubmissionFormType {
    band: string;
    contact: string;
    email: string;
    phone: string;
    attestation: boolean;
    validationMessages: string[] = [];
    constructor(band: string, contact: string, email: string, phone: string, attestation: boolean) {
        this.band = guardAgainstNullOrEmpty(band, 'band');
        this.contact = guardAgainstNullOrEmpty(contact, 'contact');
        this.email = guardAgainstNullOrEmpty(email, 'email');
        this.phone = guardAgainstNullOrEmpty(phone, 'phone');
        this.attestation = attestation;
    }

    isValid = () => {
        const { isValid, validationMessages } = musicSubmissionFormValidator.isValid(this);
        if (!isValid) this.validationMessages = validationMessages;
        return isValid;
    };
}
