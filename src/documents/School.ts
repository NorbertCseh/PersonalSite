import * as mongoose from 'mongoose';
import { CvDoc } from './Cv';

export interface SchoolDoc extends mongoose.Document {
	_id: string;
	cv: CvDoc;
	schoolName: string;
	degree: string;
	schoolFrom: number;
	schoolTo: number;
	schoolDescription: string;
	createdDate: number;
	lastUpdatedDate: number;
}
