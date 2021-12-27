import express, { Express } from "express";
import * as http from "http";
import next, { NextApiHandler } from "next";
import * as socketio from "socket.io";
const mongoose = require("mongoose");
import {
  removeUser,
  findRoom,
  sendMessage,
  addUser,
} from "./controllers/users";

const port: number = parseInt(process.env.PORT || "3000", 10);
const dev: boolean = process.env.NODE_ENV !== "production";
const nextApp = next({});
const nextHandler: NextApiHandler = nextApp.getRequestHandler();

nextApp.prepare().then(async () => {
  const app: Express = express();
  const server: http.Server = http.createServer(app);
  const io: socketio.Server = new socketio.Server();
  io.attach(server);

  const mongoDB = process.env.MONGO_DB;

  mongoose
    .connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log("<------- db connected ------->");
    })
    .catch((err: any) => console.log(err));

  io.on("connection", (socket: socketio.Socket) => {
    socket.on("join", async ({ id = socket.id, name, room }, callback) => {
      const currRoom = await findRoom(room);
      const user = await addUser(name, id, room);
      const msg = `${name}, welcome to room ${room}.`;
      const sender = "Bot";
      
      try {
        const r = await sendMessage(`${name} has joined!`, currRoom.name, sender, id);
        socket.join(r.name);
        socket.emit('joined', { 
          room: r.name,
          messages: r.messages.map((m: any) => ({
            sender: m.sender,
            message: m.message
          }))
        });
        socket.broadcast.to(r.name).emit("message", {
          sender: "Bot",
          message: `${name} has joined!`,
        });
      } catch (error) {
        console.error(error);
      }

      callback();
    });

    socket.on("sendMessage", async (message, name, room, callback) => {
      try {
        const r = await sendMessage(message, room, name);
        socket.emit("message", {
          sender: name,
          message: message,
        });
        socket.broadcast.to(r.name).emit("message", {
          sender: name,
          message: message,
        });
      } catch (error) {
        console.error(error);
      }

      callback();
    });

    socket.on("disconnect", async () => {
      const user = await removeUser(socket.id);
      if (user) {
        const msg = `${user.name} has left.`;
        const r = await sendMessage(msg, user.room);
        socket.broadcast.to(user.room).emit("message", {
          sender: "Bot",
          message: msg,
        });
      }
    });
  });

  app.all("*", (req: any, res: any) => nextHandler(req, res));

  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
});