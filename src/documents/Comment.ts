import * as mongoose from 'mongoose';
import { UserDoc } from './User';
import { PostDoc } from './Post';

export interface CommentDoc extends mongoose.Document {
	_id: string;
	author: UserDoc;
	post: PostDoc;
	commentBody: string;
	createdDate: number;
	lastUpdatedDate: number;
}
