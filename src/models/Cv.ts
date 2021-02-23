import { Schema } from 'mongoose';
import * as mongoose from 'mongoose';
import { CvDoc } from '../documents/Cv';

const CvSchema: Schema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	experiences: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Experience',
			required: false,
		},
	],
	schools: [
		{
			type: Schema.Types.ObjectId,
			ref: 'School',
			required: false,
		},
	],
	hobbies: [
		{
			type: String,
			required: false,
		},
	],
	socials: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Social',
			required: false,
		},
	],
	website: {
		type: String,
		required: false,
	},
	createdDate: {
		type: Date,
		required: true,
	},
	lastUpdatedDate: {
		type: Date,
		required: true,
	},
});

export default mongoose.model<CvDoc>('CV', CvSchema);
