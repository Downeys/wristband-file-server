import { ReadStream } from 'node:fs';
import { OutgoingHttpHeaders } from 'node:http2';

export interface StreamAudioFileResponse {
  headers: OutgoingHttpHeaders;
  stream: ReadStream;
}

export interface AudioStreamingService {
  streamMp3File(songId: string, rangeHeader?: string): Promise<StreamAudioFileResponse>;
  streamWebmFile(songId: string, rangeHeader?: string): Promise<StreamAudioFileResponse>;
}
