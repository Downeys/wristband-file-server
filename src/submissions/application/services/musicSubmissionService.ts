import { blobSubmissionService } from '../../../common/infrastructure/services/blobService';
import { musicSubmissionRepo } from '../../infrastructure/repositories/musicSubmissionRepo';
import { MusicSubmission, MusicSubmissionInput, MusicSubmissionResponse } from '../interfaces/modelInterfaces';
import { MusicSubmissionService } from '../interfaces/serviceInterfaces';

export const handleMusicSubmissionUpload = async (
    musicSubmissionInput: MusicSubmissionInput,
    images: File[],
    songs: File[]
): Promise<MusicSubmissionResponse> => {
    const imageLinks = await saveImages(images);
    const audioLinks = await saveSongs(songs);
    const musicSubmission: MusicSubmission = {
        ...musicSubmissionInput,
        imageLinks,
        audioLinks,
    };
    const submissionId = await musicSubmissionRepo.persistMusicSubmission(musicSubmission);
    return { submissionId };
};

const saveImages = async (images: File[]): Promise<string[]> => {
    const imageUrls: string[] = [];
    for (let i = 0; i < images.length; i++) {
        const { fileUrl } = await blobSubmissionService.persistPhotoSubmission(images[i]);
        imageUrls.push(fileUrl);
    }
    return imageUrls;
};

const saveSongs = async (songs: File[]): Promise<string[]> => {
    const songUrls: string[] = [];
    for (let i = 0; i < songs.length; i++) {
        const { fileUrl } = await blobSubmissionService.persistSongSubmission(songs[i]);
        songUrls.push(fileUrl);
    }
    return songUrls;
};

export const musicSubmissionService: MusicSubmissionService = { handleMusicSubmissionUpload };

export default { handleMusicSubmissionUpload };
