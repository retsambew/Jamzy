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
      if (waitingToPair.length <= 1) {
        console.log("Cant send request to self");
        socket.emit("noUsersToConnect");
      } else {
        let randomIndex = Math.floor(Math.random() * activeUsers.length);
        let reciever = await waitingToPair[0].connectionId;
        if (socket.id != reciever) {
          console.log("Offer Send", socket.id, reciever);
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

    socket.on("sendCandidate", (data) => {
      socket.to(data.to).emit("candidateRecieved", {
        candidate: data.candidate,
      });
    });
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
