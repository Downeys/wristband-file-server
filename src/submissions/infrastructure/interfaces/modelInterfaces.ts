import { ObjectId } from 'mongoose';
import { MusicSubmission } from '../../application/interfaces/modelInterfaces';

export interface MusicSubmissionSchema extends MusicSubmission, Document {
    id: ObjectId;
}
