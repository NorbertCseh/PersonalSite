import { Schema } from 'mongoose';
import * as mongoose from 'mongoose';
import { SchoolDoc } from '../documents/School';

const SchoolSchema: Schema = new Schema({
	cv: {
		type: Schema.Types.ObjectId,
		ref: 'Cv',
		required: true,
	},
	schoolName: {
		type: String,
		required: true,
	},
	degree: {
		type: String,
		required: true,
	},
	schoolFrom: {
		type: Date,
		required: true,
	},
	schoolTo: {
		type: Date,
		required: false,
	},
	schoolDescription: {
		type: String,
		required: true,
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

export default mongoose.model<SchoolDoc>('SchoolSchema', SchoolSchema);
