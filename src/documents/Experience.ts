import * as mongoose from 'mongoose';
import { CvDoc } from './Cv';

export interface ExperienceDoc extends mongoose.Document {
	_id: string;
	cv: CvDoc;
	experienceName: string;
	experienceFrom: number;
	experienceTo: number;
	experienceDescription: string;
	createdDate: number;
	lastUpdatedDate: number;
}
