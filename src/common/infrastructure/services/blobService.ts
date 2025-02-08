import { BlobServiceClient } from '@azure/storage-blob';
import path from 'node:path';
import { existsSync } from 'node:fs';
import asyncConfig from '../config/config';
import { generateBlobName, getFileBuffer } from '../utils/helpers/fileHelpers';
import { BlobFetchingService, FetchFileResponse } from '../../../streaming/application/interfaces/infrastructureContracts';
import { BlobSubmissionService, UploadFileResponse } from '../../../submissions/application/interfaces/infrastructureContracts';
import { ASSETS_PATH } from '../constants/blobConstants';
import BlobStorageError from '../errors/BlobStorageError';
import { guardAgainstNull, guardAgainstNullOrEmpty } from '../../domain/utils/argumentHelpers';
import BaseError from '../../domain/errors/BaseError';
import NotFoundError from '../../application/errors/NotFoundError';
import { CustomFile } from '../../application/interfaces/fileInterfaces';
import { logger } from '../../application/config/logging';

const NAMESPACE = 'blob-service';

const getBlobServiceClient = async () => {
    const config = await asyncConfig;
    return BlobServiceClient.fromConnectionString(config.blob.connectionString);
};

const uploadFile = async (file: CustomFile, container: string, baseUrl: string): Promise<UploadFileResponse> => {
    const blobServiceClient = await getBlobServiceClient();
    const containerClient = blobServiceClient.getContainerClient(container);
    const blobName = generateBlobName(file);
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    try {
        const buffer = await getFileBuffer(file);
        const uploadBlobResponse = await blockBlobClient.upload(buffer, buffer.byteLength);
        logger.info(`Blob was uploaded successfully. requestId: ${uploadBlobResponse.requestId}`, { namespace: NAMESPACE });
    } catch (e) {
        const err = e as Error;
        throw new BlobStorageError(err.message);
    }
    const fileUrl = baseUrl + blobName;
    return { fileUrl };
};

const fetchFile = async (fileName: string, container: string): Promise<FetchFileResponse> => {
    logger.info(`Fetching file ${fileName}.`, { namespace: NAMESPACE });
    const blobServiceClient = await getBlobServiceClient();
    const containerClient = blobServiceClient.getContainerClient(container);
    const blobClient = containerClient.getBlockBlobClient(fileName);
    const savePath = path.join(ASSETS_PATH, fileName);
    if (existsSync(savePath)) {
        logger.info(`Returning cached file from ${savePath}.`, { namespace: NAMESPACE });
        return { filePath: savePath };
    }
    try {
        const downloadResponse = await blobClient.downloadToFile(savePath);
        if (!downloadResponse) {
            logger.error('blob is null or undefined', { namespace: NAMESPACE });
            throw new BlobStorageError(`Blob response is null or undefined`);
        }
        return { filePath: savePath };
    } catch (e: unknown) {
        const err = e as BaseError;
        logger.error(err.message, { namespace: NAMESPACE });
        if (err.statusCode === 404) throw new NotFoundError('Cannot find song with that id.');
        throw new BlobStorageError(err.message);
    }
};

const persistPhotoSubmission = async (image: CustomFile): Promise<UploadFileResponse> => {
    guardAgainstNull(image, 'image');
    const config = await asyncConfig;
    logger.info(`Uploading album art. FileName: ${image.name}`, { namespace: NAMESPACE });
    return await uploadFile(image, config.blob.photoSubmissionContainer, config.blob.photoSubmissionUrl);
};

const persistSongSubmission = async (song: CustomFile): Promise<UploadFileResponse> => {
    guardAgainstNull(song, 'song');
    const config = await asyncConfig;
    logger.info(`Uploading song. Filename: ${song.name}`, { namespace: NAMESPACE });
    return await uploadFile(song, config.blob.musicSubmissionContainer, config.blob.musicSubmissionUrl);
};

const fetchMp3File = async (songId: string): Promise<FetchFileResponse> => {
    guardAgainstNullOrEmpty(songId, 'songId');
    const config = await asyncConfig;
    logger.info(`Fetching mp3 file. songId: ${songId}`, { namespace: NAMESPACE });
    const mp3FileName = songId.trim() + '.mp3';
    return await fetchFile(mp3FileName, config.blob.mp3Container);
};

const fetchWebmFile = async (songId: string): Promise<FetchFileResponse> => {
    guardAgainstNullOrEmpty(songId, 'songId');
    const config = await asyncConfig;
    logger.info(`Fetching webm file. songId: ${songId}`, { namespace: NAMESPACE });
    const webmFileName = songId.trim() + '.webm';
    return await fetchFile(webmFileName, config.blob.webmContainer);
};

export const blobFetchingService: BlobFetchingService = {
    fetchMp3File,
    fetchWebmFile,
};

export const blobSubmissionService: BlobSubmissionService = {
    persistPhotoSubmission,
    persistSongSubmission,
};

export default {
    blobFetchingService,
    blobSubmissionService,
};
