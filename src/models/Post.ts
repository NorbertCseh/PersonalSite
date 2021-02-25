import { Schema } from 'mongoose';
import * as mongoose from 'mongoose';
<<<<<<< HEAD
import { PostDoc } from '../documents/Post';
=======
>>>>>>> 1894559281e17d8944646bf4ddc00c674a2e87db

const PostSchema: Schema = new Schema({
	author: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	postTitle: {
		type: String,
		required: true,
	},
	postBody: {
		type: String,
		required: true,
	},
	comments: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Comment',
			required: false,
		},
	],
	createdDate: {
		type: Date,
		required: true,
	},
	lastUpdatedDate: {
		type: Date,
		required: true,
	},
});

<<<<<<< HEAD
export default mongoose.model<PostDoc>('Post', PostSchema);
=======
export default mongoose.model('Post', PostSchema);
>>>>>>> 1894559281e17d8944646bf4ddc00c674a2e87db
