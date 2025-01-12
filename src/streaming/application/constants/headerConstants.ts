export enum ContentType {
    mp3,
    webm,
}

export const CONTENT_TYPE_HEADER = {
    [ContentType.mp3]: 'audio/mpeg',
    [ContentType.webm]: 'video/webm',
};

export default { ContentType, CONTENT_TYPE_HEADER };
