import * as mongoose from 'mongoose';
import { UserDoc } from './User';
import { ExperienceDoc } from './Experience';
import { SchoolDoc } from './School';
import { SocialDoc } from './Social';

export interface CvDoc extends mongoose.Document {
	_id: string;
	user: UserDoc;
	experiences: ExperienceDoc[];
	schools: SchoolDoc[];
	hobbies: string[];
	socials: SocialDoc[];
	website: string;
	createdDate: number;
	lastUpdatedDate: number;
}
