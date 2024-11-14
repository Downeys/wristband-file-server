export interface BlobFetchingService {
    fetchMp3File: (fileName: string) => Promise<string>;
    fetchWebmFile: (fileName: string) => Promise<string>;
}
