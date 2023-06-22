import { Server } from "socket.io";

let io;

// local db for now
var activeUsers = 0;
var waitingToPair = [];

export const initIO = (httpServer) => {
  io = new Server(httpServer, {
    cors: { origin: "http://localhost:3000", methods: ["GET", "POST"] },
  });

  io.on("connection", (socket) => {
    socket.on("userConnected", () => {
      // add user to online clients
      activeUsers++;
      waitingToPair.push({ connectionId: socket.id });
      console.log("User Connected. Active Users: ", activeUsers);
      console.log("Users Waiting to be paired: ", waitingToPair);
    });

    socket.on("disconnect", () => {
      activeUsers--;
      waitingToPair.pop(socket.id);
      console.log("User Disconnected. Active Users: ", activeUsers);
    });

    socket.on("sendOffer", async (data) => {
      const from = socket.id;
      if (waitingToPair.length <= 1) socket.emit("noUsersToConnect");
      else {
        let randomIndex = Math.floor(Math.random() * activeUsers.length);
        let reciever = await waitingToPair[0].connectionId;
        console.log("Offer Send", socket.id, reciever);
        if (socket.id != reciever) {
          waitingToPair.pop(0);
          socket
            .to(reciever)
            .emit("offerRecieved", { offer: data.offer, from });
        }
      }
    });

    socket.on("sendAnswer", (data) => {
      console.log("Answer Send", socket.id, data.from);
      socket.to(data.from).emit("answerRecieved", data);
    });

    // console.log("user count:", activeUsers);

    // socket.on("sendRemoteOffer", (data) => {
    //   const randomIndex = Math.floor(Math.random() * activeUsers.length);
    //   var reciever = activeUsers[randomIndex];
    //   socket.to(reciever.connectionId).emit("offerRecieved", data);
    // });

    // socket.on("offerAccepted");
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
