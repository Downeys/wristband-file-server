import { ValidationError } from '../../../common/application/errors/ValidationError';
import { guardAgainstNull, guardAgainstNullOrEmpty } from '../../../common/domain/utils/argumentHelpers';
import { blobSubmissionService } from '../../../common/infrastructure/services/blobService';
import { MusicSubmissionEntity } from '../../domain/entities/MusicSubmissionEntity';
import { MusicSubmissionForm } from '../../domain/entities/MusicSubmissionForm';
import { musicSubmissionRepo } from '../../infrastructure/repositories/musicSubmissionRepo';
import { MusicSubmissionInput, MusicSubmissionResponse } from '../interfaces/modelInterfaces';
import { MusicSubmissionService } from '../interfaces/serviceInterfaces';

export const handleMusicSubmissionUpload = async (input: MusicSubmissionInput, images: File[], songs: File[]): Promise<MusicSubmissionResponse> => {
    guardAgainstNull(input, 'input');
    guardAgainstNullOrEmpty(images, 'images');
    guardAgainstNullOrEmpty(songs, 'songs');
    const submissionFormEntity = new MusicSubmissionForm(input.band, input.contact, input.email, input.phone, input.attestation);
    const submissionEntity = new MusicSubmissionEntity(submissionFormEntity, images, songs);
    const isValidSubmission = submissionEntity.isValid();
    if (!isValidSubmission) {
        throw new ValidationError(`Invalid submission: ${submissionEntity.validationMessages}`);
    }
    const imageUrls = await saveImages(submissionEntity.audioFiles);
    const audioUrls = await saveSongs(submissionEntity.audioFiles);
    submissionEntity.setImageUrls(imageUrls);
    submissionEntity.setAudioUrls(audioUrls);
    const submissionId = await musicSubmissionRepo.persistMusicSubmission(submissionEntity);
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
