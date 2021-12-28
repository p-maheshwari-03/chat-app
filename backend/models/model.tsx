import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
	connection_id: String,
	name: String,
	room: String,
});

const messageSchema = new mongoose.Schema({
	room: String,
	timestamp: String,
	message: String,
	sender: String,
	id: String,
});

const roomSchema = new mongoose.Schema({
	name: String,
	messages: [messageSchema],
});

const User = mongoose.model("user", userSchema);
const Message = mongoose.model("message", messageSchema);
const Room = mongoose.model('room', roomSchema);

export type UserType = {
	connection_id: string,
	name: string,
	room: string,
}

export type MessageType = {
	room: string,
	timestamp: string,
	message: string,
	sender: string,
	id: string,
}

export type RoomType = {
	name: string,
	messages: [MessageType],
}

export default { User, Message, Room };