import * as mongoose from 'mongoose';
import { CvDoc } from './Cv';

export interface SocialDoc extends mongoose.Document {
	_id: string;
	cv: CvDoc;
	socialName: string;
	socialUrl: string;
	createdDate: number;
	lastUpdatedDate: number;
}
