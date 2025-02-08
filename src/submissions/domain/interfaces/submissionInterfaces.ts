import { Entity } from '../../../common/domain/interfaces/entitiesInterfaces';

export interface MusicSubmissionFormType extends Entity {
  band: string;
  contact: string;
  email: string;
  phone: string;
  attestation: boolean;
}

export interface MusicSubmissionEntityType extends Entity {
  form: MusicSubmissionFormType;
  audioFiles: File[];
  imageFiles: File[];
  audioUrls: string[];
  imageUrls: string[];
}
