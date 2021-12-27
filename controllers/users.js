const { User, Message, Room } = require("../models/model");

const createMessage = (msg, room, sender = "Bot") => {
  return new Message({ 
    room,
    timestamp: Date.now(),
    message: msg,
    sender 
  });
};

const findRoom = (roomId) => {
  const room = roomId.trim();
  return new Promise((response, reject) => {
    Room.findOne({ name: room }).exec((error, data) => {
      console.log({ error, data });
      if (data && !error) {
        response(data);
      } else if (!error) {
        const newRoom = new Room({
          name: room,
          messages: [],
        });
        newRoom
          .save()
          .then((res) => response(res))
          .catch((err) => {
            console.log(err, "Cannot create room");
            reject(new Error("Cannot create room"));
          });
      } else if (error) reject(error);
    });
  });
};

const sendMessage = (msg, roomId, sender = "Bot") => {
  const room = roomId.trim();
  return new Promise((response, reject) => {
    Room.findOne({ name: room }).exec((error, data) => {
      if (data && !error) {
        const newMessage = createMessage(msg, room, sender);
        data.messages = [...data.messages, newMessage];
        data.save().then((res) => response(res));
      } else if (error) reject(error);
    });
  });
};


const removeUser = (id) => {
  return { room: "", name: "" };
};

module.exports = {
  findRoom,
  sendMessage,
  removeUser,
};