import { Schema } from 'mongoose';
import * as mongoose from 'mongoose';
import { SocialDoc } from '../documents/Social';

const SocialSchema: Schema = new Schema({
	cv: {
		type: Schema.Types.ObjectId,
		ref: 'Cv',
		required: true,
	},
	socialName: {
		type: String,
		required: true,
	},
	socialUrl: {
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

export default mongoose.model<SocialDoc>('SocialSchema', SocialSchema);
