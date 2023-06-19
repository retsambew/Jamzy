import { createServer } from "http";
import { Server } from "socket.io";

let io;

export const initIO = (app) => {
  const httpServer = createServer(app);
  io = new Server(httpServer);

  io.on("connection", (socket) => {
    socket.emit(me, socket.id);

    socket.on("disconnect", () => {
      socket.broadcast.emit("callEnded");
    });

    socket.on("callUser", (data) => {
      io.to(data.userToCall).emit("callUser", {
        signal: data.signalData,
        from: data.from,
        name: data.name,
      });
    });

    socket.on("answerCall", (data) => {
      io.to(data.to).emit("callAccepted", data.signal);
    });
  });
};

export const getIO = () => {
  if (!io) {
    throw Error("IO not initilized.");
  } else {
    return io;
  }
};
