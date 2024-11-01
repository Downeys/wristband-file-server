import { connectToDb } from "../../../common/infrastructure/repo/mongoRepo";
import { MusicSubmissionRepo } from "../../application/interfaces/infrastructureContracts";
import { MusicSubmission } from "../../application/interfaces/modelInterfaces";
import { MusicSubmission as MusicSubmissionSchema } from "../models/musicSubmission";

const persistMusicSubmission = async (musicSubmission: MusicSubmission) => {
    try {
        await connectToDb();
        await MusicSubmissionSchema.create(musicSubmission);
        return true;
    } catch (e: any) {
        console.log(`Failed to persist music submission. Submissions: ${JSON.stringify(musicSubmission)} - Error: ${e.message}`)
        return false;
    };
}

export const musicSubmissionRepo: MusicSubmissionRepo = { persistMusicSubmission }