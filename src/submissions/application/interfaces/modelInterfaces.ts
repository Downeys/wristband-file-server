import { ObjectId } from "mongoose";

export interface MusicSubmission {
    band: string;
    contact: string;
    email: string;
    phone: string;
    attestation: boolean;
    imageLinks: string[];
    audioLinks: string[];
}
