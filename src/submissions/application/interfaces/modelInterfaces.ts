export interface MusicSubmission {
    band: string;
    contact: string;
    email: string;
    phone: string;
    attestation: boolean;
    imageLinks: string[];
    audioLinks: string[];
}

export interface MusicSubmissionInput {
    band: string;
    contact: string;
    email: string;
    phone: string;
    attestation: boolean;
}

export interface MusicSubmissionResponse {
    submissionId: string;
}
