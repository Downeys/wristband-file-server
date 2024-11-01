import { INTERNAL_SERVER_ERROR } from "../../../common/infrastructure/constants/exceptionMessages";
import { connectToDb } from "../../../common/infrastructure/repo/mongoRepo";
import { MusicSubmissionRepo } from "../../application/interfaces/infrastructureContracts";
import { MusicSubmission } from "../../application/interfaces/modelInterfaces";
import { MusicSubmission as MusicSubmissionSchema } from "../models/musicSubmission";

const persistMusicSubmission = async (musicSubmission: MusicSubmission): Promise<string> => {
    try {
        await connectToDb();
        const result = await MusicSubmissionSchema.create(musicSubmission);
        return result.id;
    } catch (e: any) {
        console.log(`Failed to persist music submission. Submissions: ${JSON.stringify(musicSubmission)} - Error: ${e.message}`)
        throw new Error(INTERNAL_SERVER_ERROR);
    };
}

export const musicSubmissionRepo: MusicSubmissionRepo = { persistMusicSubmission }