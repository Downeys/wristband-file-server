import { ReadStream } from "node:fs";

export interface StreamAudioFileResponse {
    headers: Record<string, any>;
    stream: ReadStream;
}

export interface AudioStreamingService {
    streamMp3File(fileName: string, rangeHeader: string): Promise<StreamAudioFileResponse>;
    streamWebmFile(fileName: string, rangeHeader: string): Promise<StreamAudioFileResponse>;
}