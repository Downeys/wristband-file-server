import { ObjectId } from 'mongoose';
import { MusicSubmissionDto } from '../../application/interfaces/modelInterfaces';

export interface MusicSubmissionSchema extends MusicSubmissionDto, Document {
  id: ObjectId;
}
