export interface FetchFileResponse {
  filePath: string;
}

export interface BlobFetchingService {
  fetchMp3File: (songId: string) => Promise<FetchFileResponse>;
  fetchWebmFile: (songId: string) => Promise<FetchFileResponse>;
}
