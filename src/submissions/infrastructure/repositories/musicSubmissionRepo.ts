import { connectToDb } from '../../../common/infrastructure/repo/mongoRepo';
import { MusicSubmissionRepo } from '../../application/interfaces/infrastructureContracts';
import { MusicSubmission } from '../../application/interfaces/modelInterfaces';
import { MusicSubmission as MusicSubmissionSchema } from '../models/musicSubmission';

const persistMusicSubmission = async (musicSubmission: MusicSubmission): Promise<string> => {
    await connectToDb();
    const result = await MusicSubmissionSchema.create(musicSubmission);
    return result.id;
};

export const musicSubmissionRepo: MusicSubmissionRepo = { persistMusicSubmission };
export default musicSubmissionRepo;
