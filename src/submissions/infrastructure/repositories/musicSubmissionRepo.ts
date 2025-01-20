import DataAccessError from '../../../common/infrastructure/errors/DataAccessError';
import { connectToDb } from '../../../common/infrastructure/repo/mongoRepo';
import { MusicSubmissionRepo } from '../../application/interfaces/infrastructureContracts';
import { MusicSubmission } from '../../application/interfaces/modelInterfaces';
import { MusicSubmission as MusicSubmissionSchema } from '../models/musicSubmission';

const persistMusicSubmission = async (musicSubmission: MusicSubmission): Promise<string> => {
    try {
        await connectToDb();
        const result = await MusicSubmissionSchema.create(musicSubmission);
        return result.id;
    } catch (e) {
        const err = e as Error;
        throw new DataAccessError(err.message);
    }
};

export const musicSubmissionRepo: MusicSubmissionRepo = { persistMusicSubmission };
export default musicSubmissionRepo;
