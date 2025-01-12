import { ReadStream } from 'node:fs';
import { OutgoingHttpHeaders } from 'node:http2';

export interface StreamAudioFileResponse {
    headers: OutgoingHttpHeaders;
    stream: ReadStream;
}

export interface AudioStreamingService {
    streamMp3File(fileName: string, rangeHeader: string): Promise<StreamAudioFileResponse>;
    streamWebmFile(fileName: string, rangeHeader: string): Promise<StreamAudioFileResponse>;
}
