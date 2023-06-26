"use client";
import io from "socket.io-client";
import { serverURL } from "./config";

const iceConfig = {
  iceServers: [
    {
      urls: ["stun:stun1.1.google.com:19302", "stun:stun2.1.google.com:19302"],
    },
  ],
};
const createPeerConnection = () => {
  return new RTCPeerConnection(iceConfig);
};

export const socket = io.connect(serverURL);
export const peerConnection = createPeerConnection();
let peerId;

socket.on("connect", () => {
  socket.emit("userConnected");
});

export const createOffer = async () => {
  const offer = await peerConnection.createOffer();
  await peerConnection.setLocalDescription(new RTCSessionDescription(offer));
  socket.emit("sendOffer", { offer });
};

socket.on("offerRecieved", async (data) => {
  await peerConnection.setRemoteDescription(
    new RTCSessionDescription(data.offer)
  );
  const answer = await peerConnection.createAnswer();
  await peerConnection.setLocalDescription(new RTCSessionDescription(answer));

  socket.emit("sendAnswer", { answer, from: data.from, to: socket.id });
  peerId = data.from;
});

socket.on("answerRecieved", async (data) => {
  await peerConnection.setRemoteDescription(
    new RTCSessionDescription(data.answer)
  );
  peerId = data.to;
});

socket.on("noUsersToConnect", () => {
  alert("Sorry there are not enough active users to pair! \nPlease try later");
});

peerConnection.addEventListener("icecandidate", (event) => {
  if (event.candidate) {
    socket.emit("sendCandidate", {
      to: peerId,
      candidate: event.candidate,
    });
  }
});

socket.on("candidateRecieved", async (data) => {
  try {
    const candidate = new RTCIceCandidate(data.candidate);
    await peerConnection.addIceCandidate(candidate);
  } catch (error) {
    console.log(error);
  }
});

peerConnection.addEventListener("connectionstatechange", (event) => {
  if (peerConnection.connectionState === "connected") {
    console.log("Connected");
  }
});
