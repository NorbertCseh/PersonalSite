import * as express from 'express';
import * as mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import * as bodyParser from 'body-parser';

import keys from './config/Keys';

// initialize configuration
dotenv.config();

const app = express();
const PORT = process.env.PORT; // default port to listen

async function main() {
	await mongoose
		.connect(keys.MongoURI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
		})
		.then(() => console.log('Database connected'))
		.catch((err) => {
			console.log(err);
		});

	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(bodyParser.json());

	await app.get('/', (_, res) => {
		res.send('Welcome');
	});

	await app.listen(PORT, () => {
		console.log(`App is running on: http://localhost:${PORT}`);
	});
}
main();
