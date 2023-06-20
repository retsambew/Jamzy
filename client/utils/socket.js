import io from "socket.io-client";
import { serverURL } from "./config";

const socket = io.connect(serverURL);

export default socket;
