const { User, Message, Room } = require("../models/model");

const createMessage = (msg, room, sender = "Bot") => {
  return new Message({
    room,
    timestamp: Date.now(),
    message: msg,
    sender,
  });
};

const findRoom = (roomId) => {
  const room = roomId.trim();
  return new Promise((response, reject) => {
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
          .then((res) => response(res))
          .catch((err) => {
            console.log(err, "Cannot create room");
            reject(new Error("Cannot create room"));
          });
      } else if (error) reject(error);
    });
  });
};

const addUser = (name, id, room) => {
  return new Promise((response, reject) => {
    const newUser = new User({
      name,
      connection_id: id,
      room,
    });
    newUser
      .save()
      .then((res) => response(res))
      .catch(() => reject("Cannot create user"));
  });
};

const sendMessage = (msg, roomId, sender = "Bot", id = null) => {
  const room = roomId.trim();
  return new Promise((response, reject) => {
    Room.findOne({ name: room }).exec((error, data) => {
      if (data && !error) {
        const newMessage = createMessage(msg, room, sender, id);
        data.messages = [...data.messages, newMessage];
        data.save().then((res) => response(res));
      } else if (error) reject(error);
    });
  });
};

const removeUser = (id) => {
  return new Promise((response, reject) => {
    User.findOneAndDelete({ connection_id: id }).exec((error, data) =>
      response(data)
    );
  });
};

module.exports = {
  findRoom,
  sendMessage,
  removeUser,
  addUser,
};