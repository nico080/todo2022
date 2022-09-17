import mongoose from "mongoose";

const DB_URL = "mongodb+srv://no1has2kn0w:ZEOhTvv7cFuudW7F@cluster0.bcwkz8x.mongodb.net/appdb?retryWrites=true&w=majority";

if (!DB_URL) {
	throw new Error(
		"connection error"
	);
}

let cached = global.mongoose;

if (!cached) {
	cached = global.mongoose = { conn: null, promise: null };
}

const dbConnect = async () => {
	if (cached.conn) {
		return cached.conn;
	}

	if (!cached.promise) {
		const options = {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		};

		cached.promise = mongoose.connect(DB_URL, options).then((mongoose) => {
			return mongoose;
		});
	}
	cached.conn = await cached.promise;
	return cached.conn;
};


export default dbConnect;