import * as mongoose from 'mongoose';
import { UserDoc } from './User';

export interface ProjectDoc extends mongoose.Document {
	_id: string;
	user: UserDoc;
	name: string;
	URL: string;
	imageURL: string;
	creationDate: number;
	lastUpdatedDate: number;
}
