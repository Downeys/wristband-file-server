export interface BlobFetchingService {
    fetchMp3File: (fileName: string) => Promise<Buffer | null>;
    fetchWebmFile: (fileName: string) => Promise<Buffer | null>;
}
