import { BlobServiceClient } from '@azure/storage-blob';
import path from 'node:path';
import { existsSync } from 'node:fs';
import logging from '../logging/logging';
import config from '../config/config';
import { generateBlobName, getFileBuffer } from '../utils/helpers/fileHelpers';
import { BlobFetchingService, FetchFileResponse } from '../../../streaming/application/interfaces/infrastructureContracts';
import { BlobSubmissionService, UploadFileResponse } from '../../../submissions/application/interfaces/infrastructureContracts';
import { ASSETS_PATH } from '../constants/blobConstants';
import BlobStorageError from '../errors/BlobStorageError';

const NAMESPACE = 'blob-service';

const { connectionString, photoSubmissionUrl, musicSubmissionUrl, photoSubmissionContainer, musicSubmissionContainer, mp3Container, webmContainer } =
    config.blob;

const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);

const uploadFile = async (file: File, container: string, baseUrl: string): Promise<UploadFileResponse> => {
    const containerClient = blobServiceClient.getContainerClient(container);
    const blobName = generateBlobName(file);
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    try {
        const buffer = await getFileBuffer(file);
        const uploadBlobResponse = await blockBlobClient.upload(buffer, buffer.byteLength);
        logging.info(NAMESPACE, `Blob was uploaded successfully. requestId: ${uploadBlobResponse.requestId}`);
    } catch (e) {
        const err = e as Error;
        throw new BlobStorageError(err.message);
    }
    const fileUrl = baseUrl + blobName;
    return { fileUrl };
};

const fetchFile = async (fileName: string, container: string): Promise<FetchFileResponse> => {
    logging.info(NAMESPACE, `Fetching file ${fileName}.`);
    const containerClient = blobServiceClient.getContainerClient(container);
    const blobClient = containerClient.getBlockBlobClient(fileName);
    const savePath = path.join(ASSETS_PATH, fileName);
    if (existsSync(savePath)) {
        logging.info(NAMESPACE, `Returning cached file from ${savePath}.`);
        return { filePath: savePath };
    }
    try {
        const downloadResponse = await blobClient.downloadToFile(savePath);
        if (!downloadResponse) {
            throw new BlobStorageError(`Blob response is null or undefined`);
        }
        return { filePath: savePath };
    } catch (e: unknown) {
        const err = e as Error;
        throw new BlobStorageError(err.message);
    }
};

const persistPhotoSubmission = async (photo: File): Promise<UploadFileResponse> => {
    logging.info(NAMESPACE, `Uploading album art. FileName: ${photo.name}`);
    return await uploadFile(photo, photoSubmissionContainer, photoSubmissionUrl);
};

const persistSongSubmission = async (song: File): Promise<UploadFileResponse> => {
    logging.info(NAMESPACE, `Uploading song. Filename: ${song.name}`);
    return await uploadFile(song, musicSubmissionContainer, musicSubmissionUrl);
};

const fetchMp3File = async (fileName: string): Promise<FetchFileResponse> => {
    logging.info(NAMESPACE, `Fetching mp3 file. Filename: ${fileName}`);
    const mp3FileName = fileName.trim() + '.mp3';
    return await fetchFile(mp3FileName, mp3Container);
};

const fetchWebmFile = async (fileName: string): Promise<FetchFileResponse> => {
    logging.info(NAMESPACE, `Fetching webm file. Filename: ${fileName}`);
    const webmFileName = fileName.trim() + '.webm';
    return await fetchFile(webmFileName, webmContainer);
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
