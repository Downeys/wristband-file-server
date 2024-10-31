export interface BlobSubmissionService {
    persistPhotoSubmission: (photo: File) => Promise<string>;
    persistSongSubmission: (song: File) => Promise<string>;
}
