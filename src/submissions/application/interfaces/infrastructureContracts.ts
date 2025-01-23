import { MusicSubmissionEntityType } from '../../domain/interfaces/submissionInterfaces';

export interface UploadFileResponse {
    fileUrl: string;
}

export interface BlobSubmissionService {
    persistPhotoSubmission: (photo: File) => Promise<UploadFileResponse>;
    persistSongSubmission: (song: File) => Promise<UploadFileResponse>;
}

export interface MusicSubmissionRepo {
    persistMusicSubmission: (musicSubmission: MusicSubmissionEntityType) => Promise<string>;
}
