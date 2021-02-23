import { Schema } from 'mongoose';
import * as mongoose from 'mongoose';
import { ExperienceDoc } from '../documents/Experience';

const ExperienceSchema: Schema = new Schema({
	cv: {
		type: Schema.Types.ObjectId,
		ref: 'Cv',
		required: true,
	},
	experienceName: {
		type: String,
		required: true,
	},
	experienceFrom: {
		type: Date,
		required: true,
	},
	experienceTo: {
		type: Date,
		required: false,
	},
	experienceDescription: {
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

export default mongoose.model<ExperienceDoc>('Experience', ExperienceSchema);
