import { Server, Socket } from "socket.io";
import {
  getGame,
  click,
  purchaseUpgrade,
  tickHotChocolatesPerSecond,
} from "../controllers/gameController";

const gameSocket = (io: Server) => {
  setInterval(async () => {
    const updatedGame = await tickHotChocolatesPerSecond();
    io.emit("gameUpdated", updatedGame);
  }, 1000);

  io.on("connection", async (socket: Socket) => {
    const game = await getGame();
    socket.emit("gameRetrieved", game);

    socket.on("click", async () => {
      try {
        const updatedGame = await click();
        io.emit("gameUpdated", updatedGame);
      } catch (error) {
        socket.emit("error", { action: "click", error });
      }
    });

    socket.on("purchaseUpgrade", async (upgrade: number) => {
      try {
        const updatedGame = await purchaseUpgrade(upgrade);
        io.emit("gameUpdated", updatedGame);
      } catch (error) {
        socket.emit("error", { action: "purchase", error });
      }
    });
  });
};

export default gameSocket;
