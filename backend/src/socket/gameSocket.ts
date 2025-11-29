import { Server, Socket } from "socket.io";
import { getGame, click } from "../controllers/gameController";

const gameSocket = (io: Server) => {
  io.on("connection", async (socket: Socket) => {
    const game = await getGame();
    socket.emit("gameRetrieved", game);

    socket.on("click", async () => {
      console.log("Clicked");
      try {
        const updatedGame = await click();
        io.emit("gameUpdated", updatedGame);
      } catch (error) {
        socket.emit("error", { action: "click", error });
      }
    });
  });
};

export default gameSocket;
