import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import jamRoutes from "./routes/jam.js";
import { initIO, getIO } from "./utils/socket.js";
import { createServer } from "http";

const app = express();
const httpServer = createServer(app);

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/jam", jamRoutes);

initIO(httpServer);

// const CONNECTION_URL =
//   "mongodb+srv://Core:Core123@maincluster.tvjun.mongodb.net/MainDB";
const PORT = process.env.PORT || 5000;

// mongoose
//   .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() =>
httpServer.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
// )
// .catch((error) => console.log(error.message));

getIO();
