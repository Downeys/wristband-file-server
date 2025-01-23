import { guardAgainstNull } from '../../../common/domain/utils/argumentHelpers';
import DataAccessError from '../../../common/infrastructure/errors/DataAccessError';
import { connectToDb } from '../../../common/infrastructure/repo/mongoRepo';
import { MusicSubmissionRepo } from '../../application/interfaces/infrastructureContracts';
import { MusicSubmissionDto } from '../../application/interfaces/modelInterfaces';
import { MusicSubmissionEntityType } from '../../domain/interfaces/submissionInterfaces';
import { MusicSubmission as MusicSubmissionSchema } from '../models/musicSubmission';

const persistMusicSubmission = async (musicSubmission: MusicSubmissionEntityType): Promise<string> => {
    guardAgainstNull(musicSubmission, 'musicSubmission');
    const musicSubmissionDto: MusicSubmissionDto = {
        band: musicSubmission.form.band,
        contact: musicSubmission.form.contact,
        email: musicSubmission.form.email,
        phone: musicSubmission.form.phone,
        attestation: musicSubmission.form.attestation,
        imageLinks: musicSubmission.imageUrls,
        audioLinks: musicSubmission.audioUrls,
    };
    try {
        await connectToDb();
        const result = await MusicSubmissionSchema.create(musicSubmissionDto);
        return result.id;
    } catch (e) {
        const err = e as Error;
        throw new DataAccessError(err.message);
    }
};

export const musicSubmissionRepo: MusicSubmissionRepo = { persistMusicSubmission };
export default musicSubmissionRepo;
