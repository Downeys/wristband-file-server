export interface FetchFileResponse {
    filePath: string;
}

export interface BlobFetchingService {
    fetchMp3File: (fileName: string) => Promise<FetchFileResponse>;
    fetchWebmFile: (fileName: string) => Promise<FetchFileResponse>;
}
