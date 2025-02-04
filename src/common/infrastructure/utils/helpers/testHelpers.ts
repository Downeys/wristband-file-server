import { CustomFile } from '../../../application/interfaces/fileInterfaces';

export const getMockFile = (name: string, size: number, type: string): CustomFile => {
    const blob = new Blob(['a'.repeat(size)], { type });
    const file = new File([blob], name, { type });
    return file as CustomFile;
};
