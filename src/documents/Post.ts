import * as mongoose from 'mongoose';
import { CommentDoc } from './Comment';
import { UserDoc } from './User';

export interface PostDoc extends mongoose.Document {
	_id: string;
	author: UserDoc;
	postTitle: string;
	postBody: string;
	comments: CommentDoc;
	createdDate: number;
	lastUpdatedDate: number;
}
