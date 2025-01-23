import { Specification } from '../../../common/domain/interfaces/specificationInterfaces';
import { MusicSubmissionForm } from '../entities/MusicSubmissionForm';

export const isContactNameValid: Specification<MusicSubmissionForm> = {
    isSatisfiedBy: (form: MusicSubmissionForm) => /^[a-zÀ-ÿ ,.'-]+$/i.test(form.contact),
};

export const isEmailValid: Specification<MusicSubmissionForm> = {
    isSatisfiedBy: (form: MusicSubmissionForm) => /^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/i.test(form.email),
};

export const isPhoneValid: Specification<MusicSubmissionForm> = {
    isSatisfiedBy: (form: MusicSubmissionForm) => !form.phone || /^(1[ -]?)?\d{3}[ -]?\d{3}[ -]?\d{4}$/i.test(form.phone),
};

export const isAttestationChecked: Specification<MusicSubmissionForm> = {
    isSatisfiedBy: (form: MusicSubmissionForm) => form.attestation,
};
