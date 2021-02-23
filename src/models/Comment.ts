import { Schema } from 'mongoose';
import * as mongoose from 'mongoose';
import { CommentDoc } from '../documents/Comment';
import User from './User';
import Post from './Post';

const CommentSchema: Schema = new Schema({
	author: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	post: {
		type: Schema.Types.ObjectId,
		ref: 'Post',
		required: true,
	},
	commentBody: {
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

export default mongoose.model<CommentDoc>('Comment', CommentSchema);
