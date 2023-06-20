import { Server } from "socket.io";

let io;

export const initIO = (httpServer) => {
  io = new Server(httpServer, {
    cors: { origin: "http://localhost:3000", methods: ["GET", "POST"] },
  });

  io.on("connection", (socket) => {
    console.log("Connected");
    //   socket.emit(me, socket.id);
    //   socket.on("disconnect", () => {
    //     socket.broadcast.emit("callEnded");
    //   });
    //   socket.on("callUser", (data) => {
    //     io.to(data.userToCall).emit("callUser", {
    //       signal: data.signalData,
    //       from: data.from,
    //       name: data.name,
    //     });
    //   });
    //   socket.on("answerCall", (data) => {
    //     io.to(data.to).emit("callAccepted", data.signal);
    //   });
  });
  io.on("connect_error", (err) => {
    console.log(`connect_error due to ${err.message}`);
  });
};

export const getIO = () => {
  if (!io) {
    throw Error("IO not initilized.");
  } else {
    return io;
  }
};
