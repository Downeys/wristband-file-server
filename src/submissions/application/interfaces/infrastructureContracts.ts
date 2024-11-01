import { MusicSubmission } from "./modelInterfaces";

export interface BlobSubmissionService {
    persistPhotoSubmission: (photo: File) => Promise<string>;
    persistSongSubmission: (song: File) => Promise<string>;
}

export interface MusicSubmissionRepo {
    persistMusicSubmission: (musicSubmission: MusicSubmission) => Promise<string>
}
