import { BlobDownloadResponseParsed, BlobServiceClient } from "@azure/storage-blob";
import logging from '../logging/logging';
import config from '../config/config';
import { generateBlobName, getFileBuffer, streamToBuffer } from "../utils/helpers/fileHelpers";
import { BlobFetchingService } from "../../../streaming/application/interfaces/infrastructureContracts";
import { BlobSubmissionService } from "../../../submissions/application/interfaces/infrastructureContracts";
import { INTERNAL_SERVER_ERROR } from "../constants/exceptionMessages";

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

const fetchFile = async (fileName: string, container: string): Promise<Buffer> => {
    const containerClient = blobServiceClient.getContainerClient(container);
    const blobClient = containerClient.getBlobClient(fileName);
    try {
        const downloadBlockBlobResponse = await blobClient.download();
        if (!downloadBlockBlobResponse){
            throw new Error(`Blob response is null or undefined. Blob response: ${JSON.stringify(downloadBlockBlobResponse)}`)
        }
        const downloaded = await streamToBuffer(downloadBlockBlobResponse.readableStreamBody!);
        console.log("Downloaded blob content:", downloaded);
        return downloaded;
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

const fetchMp3File = async (fileName: string): Promise<Buffer | null> => {
    logging.info(NAMESPACE, `Fetching mp3 file. Filename: ${fileName}`);
    return await fetchFile(fileName, mp3Container)
}

const fetchWebmFile = async (fileName: string): Promise<Buffer | null> => {
    logging.info(NAMESPACE, `Fetching webm file. Filename: ${fileName}`);
    return await fetchFile(fileName, webmContainer)
}

export const FetchingService: BlobFetchingService = { fetchMp3File, fetchWebmFile }

export const SubmissionService: BlobSubmissionService = { persistPhotoSubmission, persistSongSubmission }

export default { persistPhotoSubmission, persistSongSubmission, fetchMp3File, fetchWebmFile }
