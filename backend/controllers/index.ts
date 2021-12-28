import Models, { UserType, MessageType, RoomType } from "../models/model";

const { User, Message, Room } = Models;

const createMessage = (msg: string, room: string, sender: string = "Bot"): MessageType => {
  return new Message({
    room,
    timestamp: Date.now(),
    message: msg,
    sender,
  });
};

export const findRoom = (roomId: string): Promise<RoomType> => {
  const room = roomId.trim();
  return new Promise((response, reject) => {
    if (!room) {
      reject(new Error("Invalid room"));
    }

    Room.findOne({ name: room }).exec((error, data) => {
      if (data && !error) {
        response(data);
      } else if (!error) {
        const newRoom = new Room({
          name: room,
          messages: [],
        });
        newRoom
          .save()
          .then((res: RoomType) => response(res))
          .catch((err: Error) => {
            console.log(err, "Cannot create room");
            reject(new Error("Cannot create room"));
          });
      } else if (error) reject(error);
    });
  });
};

export const addUser = (name: string, id: string, room: string): Promise<UserType> => {
  return new Promise((response, reject) => {

    if (!name || !room) {
      reject(new Error("User can't be added"));
    }

    const newUser = new User({
      name,
      connection_id: id,
      room,
    });
    newUser
      .save()
      .then((res: UserType) => response(res))
      .catch(() => reject("Cannot create user"));
  });
};

export const sendMessage = (msg: string, roomId: string, sender: string = "Bot"): Promise<RoomType> => {
  const room = roomId.trim();
  const message = msg.trim();
  return new Promise((response, reject) => {

    if (!room) {
      reject(new Error("Room not found"));
    }

    if (!message) {
      reject(new Error("Unable to send message"));
    }

    Room.findOne({ name: room }).exec((error, data) => {
      if (data && !error) {
        const newMessage = createMessage(message, room, sender);
        data.messages = [...data.messages, newMessage];
        data.save().then((res: RoomType) => response(res));
      } else if (error) reject(error);
    });
  });
};

export const removeUser = (id: string): Promise<UserType> => {
  return new Promise((response, reject) => {
    User.findOneAndDelete({ connection_id: id }).exec((error, data) =>
      response(data)
    );
  });
};
