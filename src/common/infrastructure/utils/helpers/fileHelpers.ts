import sharp from 'sharp';
import { v4 as uuidv4 } from 'uuid';
import { APP_MAX_WIDTH } from '../../constants/blobConstants';
import { CustomFile } from '../../../application/interfaces/fileInterfaces';

const optimize = async (input: Buffer): Promise<Buffer> =>
  await sharp(input, { failOn: 'none' }).rotate().resize({ width: APP_MAX_WIDTH, withoutEnlargement: true }).webp().toBuffer();

export const generateBlobName = (file: File) => uuidv4() + file.name;

export const getFileBuffer = async (file: CustomFile) => {
  const bytes = await file.arrayBuffer?.();
  const buffer = file.buffer ?? Buffer.from(bytes);
  const isImage = file.type?.includes('image');
  return isImage ? optimize(buffer) : buffer;
};

export default { generateBlobName, getFileBuffer };
