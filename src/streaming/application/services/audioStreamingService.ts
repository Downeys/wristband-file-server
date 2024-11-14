import { createReadStream, statSync } from "node:fs";
import { AudioStreamingService, StreamAudioFileResponse } from "../interfaces/serviceInterfaces";
import logging from "../../../common/infrastructure/logging/logging";
import { blobFetchingService } from "../../../common/infrastructure/services/blobService";
import { CHUNK_SIZE } from "../constants/fileConstants";
import { ContentType, CONTENT_TYPE_HEADER } from "../constants/headerConstants";

const NAMESPACE = 'audio-streaming-service';

const streamMp3File = async  (fileName: string, rangeHeader: string): Promise<StreamAudioFileResponse> => {
    logging.info(NAMESPACE, `Fetching file: ${fileName}`);
    const filePath = await blobFetchingService.fetchMp3File(fileName); // path to audio file

    const { start, end, audioSize } = getAudioChunkDetails(filePath, rangeHeader);
    const headers = getResponseHeaders(start, end, audioSize, ContentType.mp3)
    const stream = createReadStream(filePath, { start, end });

    return { headers, stream }
}

const streamWebmFile = async  (fileName: string, rangeHeader: string): Promise<StreamAudioFileResponse> => {
    logging.info(NAMESPACE, `Fetching file: ${fileName}`);
    const filePath = await blobFetchingService.fetchWebmFile(fileName); // path to audio file

    const { start, end, audioSize } = getAudioChunkDetails(filePath, rangeHeader);
    const headers = getResponseHeaders(start, end, audioSize, ContentType.webm)
    const stream = createReadStream(filePath, { start, end });

    return { headers, stream }
}

const getAudioChunkDetails = (filePath: string, rangeHeader: string = '') => {
    // send audio in chunks
    const range = rangeHeader || "0";
    const audioSize = statSync(filePath).size; // get audio size

    // define start and end of current chunk
    const start = Number(range.replace(/\D/g, ""));
    const end = Math.min(start + CHUNK_SIZE, audioSize - 1);
    return { start, end, audioSize };
}

const getResponseHeaders = (start: number, end: number, audioSize: number, fileType: ContentType) => {
    const contentLength = end - start + 1;
    const contentType = CONTENT_TYPE_HEADER[fileType];

    // set headers for transfer to client
    const headers = {
        "Content-Range": `bytes ${start}-${end}/${audioSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": contentLength,
        "Content-Type": contentType,
        "Transfer-Encoding": "chunked",
    };

    return { headers, start, end };
}

export const audioStreamingService: AudioStreamingService = { streamMp3File, streamWebmFile };

export default { streamMp3File, streamWebmFile };