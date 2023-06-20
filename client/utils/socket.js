import io from "socket.io-client";
import { serverURL } from "./config";

const socket = io.connect(serverURL);

socket.on("connect", () => {
  console.log("Connected");
});

export default socket;
