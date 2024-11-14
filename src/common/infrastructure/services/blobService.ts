import { BlobServiceClient } from "@azure/storage-blob";
import path from "node:path";
import { existsSync } from "node:fs";
import logging from '../logging/logging';
import config from '../config/config';
import { generateBlobName, getFileBuffer } from "../utils/helpers/fileHelpers";
import { BlobFetchingService } from "../../../streaming/application/interfaces/infrastructureContracts";
import { BlobSubmissionService } from "../../../submissions/application/interfaces/infrastructureContracts";
import { INTERNAL_SERVER_ERROR } from "../constants/exceptionMessages";
import { ASSETS_PATH } from "../constants/blobConstants";

const NAMESPACE = 'blob-service';

const {
    connectionString,
    photoSubmissionUrl,
    musicSubmissionUrl,
    photoSubmissionContainer,
    musicSubmissionContainer,
    mp3Container,
    webmContainer
} = config.blob;

const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);

const uploadFile = async (file: File, container: string, baseUrl: string): Promise<string> => {
    const containerClient = blobServiceClient.getContainerClient(container);
    const blobName = generateBlobName(file);
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    try {
        const buffer = await getFileBuffer(file);
        const uploadBlobResponse = await blockBlobClient.upload(buffer, buffer.byteLength);
        logging.info(NAMESPACE, `Blob was uploaded successfully. requestId: ${uploadBlobResponse.requestId}`);
    } catch (e:  any) {
        logging.info(NAMESPACE, `Blob failed to upload. blobName: ${blobName}`);
        throw new Error(INTERNAL_SERVER_ERROR)
    }
    const fileUrl = baseUrl + blobName;
    return fileUrl
}

const fetchFile = async (fileName: string, container: string): Promise<string> => {
    const containerClient = blobServiceClient.getContainerClient(container);
    const blobClient = containerClient.getBlobClient(fileName);
    const savePath = path.join(ASSETS_PATH, fileName)
    if (existsSync(savePath)) {
        console.log(`Returning cached file from ${savePath}.`);
        return savePath;
    }
    try {
        const downloadResponse = await blobClient.downloadToFile(savePath);
        if (!downloadResponse){
            console.log(`Blob response is null or undefined. Blob response: ${JSON.stringify(downloadResponse)}`);
            throw new Error(INTERNAL_SERVER_ERROR)
        }
        console.log(`Downloaded blob content: ${JSON.stringify(downloadResponse)}`);
        return savePath;
    } catch (e: any) {
        console.log(`Failed to fetch file. Unable to instantiate blob client. Filename: ${fileName} - Error: ${e.message}`);
        throw new Error(INTERNAL_SERVER_ERROR);
    }
}

const persistPhotoSubmission = async (photo: File): Promise<string> => {
    logging.info(NAMESPACE, `Uploading album art. FileName: ${photo.name}`);
    return await uploadFile(photo, photoSubmissionContainer, photoSubmissionUrl);
};

const persistSongSubmission = async (song: File): Promise<string> => {
    logging.info(NAMESPACE, `Uploading song. Filename: ${song.name}`);
    return await uploadFile(song, musicSubmissionContainer, musicSubmissionUrl);
};

const fetchMp3File = async (fileName: string): Promise<string> => {
    logging.info(NAMESPACE, `Fetching mp3 file. Filename: ${fileName}`);
    const mp3FileName = fileName + '.mp3';
    return await fetchFile(mp3FileName, mp3Container)
}

const fetchWebmFile = async (fileName: string): Promise<string> => {
    logging.info(NAMESPACE, `Fetching webm file. Filename: ${fileName}`);
    const webmFileName = fileName + '.webm';
    return await fetchFile(webmFileName, webmContainer)
}

export const blobFetchingService: BlobFetchingService = { fetchMp3File, fetchWebmFile }

export const blobSubmissionService: BlobSubmissionService = { persistPhotoSubmission, persistSongSubmission }

export default { persistPhotoSubmission, persistSongSubmission, fetchMp3File, fetchWebmFile }
