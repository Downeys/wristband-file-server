import { CustomFile } from '../../../common/application/interfaces/fileInterfaces';
import { MusicSubmissionInput, MusicSubmissionResponse } from './modelInterfaces';

export interface MusicSubmissionService {
    handleMusicSubmissionUpload: (
        musicSubmissionInput: MusicSubmissionInput,
        images: CustomFile[],
        songs: CustomFile[]
    ) => Promise<MusicSubmissionResponse>;
}
