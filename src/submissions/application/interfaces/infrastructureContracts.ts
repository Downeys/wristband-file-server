import { CustomFile } from '../../../common/application/interfaces/fileInterfaces';
import { MusicSubmissionEntityType } from '../../domain/interfaces/submissionInterfaces';

export interface UploadFileResponse {
  fileUrl: string;
}

export interface BlobSubmissionService {
  persistPhotoSubmission: (photo: CustomFile) => Promise<UploadFileResponse>;
  persistSongSubmission: (song: CustomFile) => Promise<UploadFileResponse>;
}

export interface MusicSubmissionRepo {
  persistMusicSubmission: (musicSubmission: MusicSubmissionEntityType) => Promise<string>;
}
