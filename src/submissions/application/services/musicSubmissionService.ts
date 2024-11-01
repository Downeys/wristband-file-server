import { SubmissionService } from "../../../common/infrastructure/services/blobService";
import { musicSubmissionRepo } from "../../infrastructure/repositories/musicSubmissionRepo";
import { MusicSubmission, MusicSubmissionInput, MusicSubmissionResponse } from "../interfaces/modelInterfaces";

export const handleMusicSubmissionUpload = async (musicSubmissionInput: MusicSubmissionInput, images: File[], songs: File[]): Promise<MusicSubmissionResponse> => {
    const imageLinks = await saveImages(images);
    const audioLinks = await saveSongs(songs);
    const musicSubmission: MusicSubmission = {
        ...musicSubmissionInput,
        imageLinks,
        audioLinks
    }
    const submissionId = await musicSubmissionRepo.persistMusicSubmission(musicSubmission);
    return { submissionId }
}

const saveImages = async (images: File[]): Promise<string[]> => {
    let imageLinks: string[] = [];
    for (let i = 0; i < images.length; i++) {
        const link = await SubmissionService.persistPhotoSubmission(images[i]);
        imageLinks.push(link);
    }
    return imageLinks;
}

const saveSongs = async (songs: File[]): Promise<string[]> => {
    let songLinks: string[] = [];
    for (let i = 0; i < songs.length; i++) {
        const link = await SubmissionService.persistSongSubmission(songs[i]);
        songLinks.push(link);
    }
    return songLinks;
}