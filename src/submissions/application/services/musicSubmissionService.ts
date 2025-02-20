import { logger } from '../../../common/application/config/logging';
import { ValidationError } from '../../../common/application/errors/ValidationError';
import { CustomFile } from '../../../common/application/interfaces/fileInterfaces';
import { guardAgainstNull, guardAgainstNullOrEmpty } from '../../../common/domain/utils/argumentHelpers';
import { blobSubmissionService } from '../../../common/infrastructure/services/blobService';
import { MusicSubmissionEntity } from '../../domain/entities/MusicSubmissionEntity';
import { MusicSubmissionForm } from '../../domain/entities/MusicSubmissionForm';
import { musicSubmissionRepo } from '../../infrastructure/repositories/musicSubmissionRepo';
import { MusicSubmissionInput, MusicSubmissionResponse } from '../interfaces/modelInterfaces';
import { MusicSubmissionService } from '../interfaces/serviceInterfaces';

const NAMESPACE = 'music-submission-service';

export const handleMusicSubmissionUpload = async (
  input: MusicSubmissionInput,
  images: CustomFile[],
  songs: CustomFile[]
): Promise<MusicSubmissionResponse> => {
  logger.info(`Handling music submission for ${input.email}`, { namespace: NAMESPACE });
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

const saveImages = async (images: CustomFile[]): Promise<string[]> => {
  logger.info(`Saving images count: ${images.length}`, { namespace: NAMESPACE });
  const imageUrls: string[] = [];
  for (const image of images) {
    const { fileUrl } = await blobSubmissionService.persistPhotoSubmission(image);
    imageUrls.push(fileUrl);
  }
  return imageUrls;
};

const saveSongs = async (songs: CustomFile[]): Promise<string[]> => {
  logger.info(`Saving songs count: ${songs.length}`, { namespace: NAMESPACE });
  const songUrls: string[] = [];
  for (const song of songs) {
    const { fileUrl } = await blobSubmissionService.persistSongSubmission(song);
    songUrls.push(fileUrl);
  }
  return songUrls;
};

export const musicSubmissionService: MusicSubmissionService = { handleMusicSubmissionUpload };

export default { handleMusicSubmissionUpload };
