import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import gameSocket from "./socket/gameSocket";

dotenv.config();

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    credentials: true,
  },
});
app.use(express.json());
app.use(cookieParser());

gameSocket(io);

app.use(express.static("public"));

app.use((req: any, res: any) => {
  res.sendFile("./public/index.html", { root: "." }, (error: any) => {
    if (error) {
      console.error("Error sending index.html:", error);
      res.status(500).send("Internal Server Error");
    }
  });
});

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});
