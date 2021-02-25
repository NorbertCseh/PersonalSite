import { Schema } from 'mongoose';
import * as mongoose from 'mongoose';
import { ProfileDoc } from '../documents/Profile';

const ProfileSchema: Schema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	firstName: {
		type: String,
		required: true,
	},
	middleName: {
		type: String,
		required: true,
	},
	lastName: {
		type: String,
		required: true,
	},
	birthday: {
		type: Date,
		required: true,
	},
	address: {
		type: String,
		required: true,
	},
	phone: {
		type: Number,
		required: false,
	},
	email: {
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

export default mongoose.model<ProfileDoc>('ProfileSchema', ProfileSchema);
