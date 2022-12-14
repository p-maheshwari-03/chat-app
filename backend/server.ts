import * as http from 'http';

import express, { Express } from 'express';
import mongoose from 'mongoose';
import next, { NextApiHandler } from 'next';
import * as socketio from 'socket.io';

import {
  removeUser,
  findRoom,
  sendMessage,
  addUser,
} from './controllers';
import { RoomType } from './models/model';

const port: number = parseInt(process.env.PORT || '3000', 10);
const nextApp = next({});
const nextHandler: NextApiHandler = nextApp.getRequestHandler();

nextApp.prepare().then(async () => {
  const app: Express = express();
  const server: http.Server = http.createServer(app);
  const io: socketio.Server = new socketio.Server();
  io.attach(server);

  const mongoDB: any = process.env.MONGO_DB;

  mongoose
    .connect(mongoDB)
    .then(() => {
      console.log('<------- db connected ------->');
    })
    .catch((err: any) => console.log(err));

  io.on('connection', (socket: socketio.Socket) => {
    socket.on('join', async ({ id = socket.id, name, room }, callback) => {
      const currRoom: RoomType = await findRoom(room);
      await addUser(name, id, room);
      const sender = 'Bot';

      try {
        const r: RoomType = await sendMessage(`${name} has joined!`, currRoom.name, sender);
        socket.join(r.name);
        socket.emit('joined', {
          room: r.name,
          messages: r.messages.map((m: any) => ({
            sender: m.sender,
            message: m.message,
          })),
        });
        socket.broadcast.to(r.name).emit('message', {
          sender: 'Bot',
          message: `${name} has joined!`,
        });
      } catch (error) {
        console.error(error);
      }

      callback();
    });

    socket.on('sendMessage', async (message, name, room, callback) => {
      try {
        const r = await sendMessage(message, room, name);
        socket.emit('message', {
          sender: name,
          message,
        });
        socket.broadcast.to(r.name).emit('message', {
          sender: name,
          message,
        });
      } catch (error) {
        console.error(error);
      }

      callback();
    });

    socket.on('disconnect', async () => {
      const user = await removeUser(socket.id);
      if (user) {
        const msg = `${user.name} has left.`;
        await sendMessage(msg, user.room);
        socket.broadcast.to(user.room).emit('message', {
          sender: 'Bot',
          message: msg,
        });
      }
    });
  });

  app.all('*', (req: any, res: any) => nextHandler(req, res));

  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
});
