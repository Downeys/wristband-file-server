import { MusicSubmissionInput, MusicSubmissionResponse } from "./modelInterfaces";

export interface MusicSubmissionService {
    handleMusicSubmissionUpload: (musicSubmissionInput: MusicSubmissionInput, images: File[], songs: File[]) => Promise<MusicSubmissionResponse>;
}