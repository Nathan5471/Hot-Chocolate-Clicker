import { Server, Socket } from "socket.io";
import {
  getGames,
  getGame,
  createGame,
  click,
  purchaseUpgrade,
  tickHotChocolatesPerSecond,
} from "../controllers/gameController";

const gameSocket = (io: Server) => {
  setInterval(async () => {
    const updatedGames = await tickHotChocolatesPerSecond();
    for (const updatedGame of updatedGames) {
      io.to(`game_${updatedGame.id}`).emit("gameUpdated", updatedGame);
    }
  }, 1000);

  io.on("connection", async (socket: Socket) => {
    socket.join("waitingRoom");
    const games = await getGames();
    socket.emit("games", games);

    socket.on("joinGame", async (gameId: number) => {
      try {
        const game = await getGame(gameId);
        socket.leave("waitingRoom");
        socket.join(`game_${game.id}`);
        socket.emit("gameJoined", game);
      } catch (error) {
        socket.emit("error", { action: "join", error });
      }
    });

    socket.on("createGame", async () => {
      try {
        const game = await createGame();
        socket.emit("gameJoined", game);
        const games = await getGames();
        io.to("waitingRoom").emit("games", games);
      } catch (error) {
        socket.emit("error", { action: "create", error });
      }
    });

    socket.on("click", async (gameId: number) => {
      try {
        const updatedGame = await click(gameId);
        io.to(`game_${gameId}`).emit("gameUpdated", updatedGame);
      } catch (error) {
        socket.emit("error", { action: "click", error });
      }
    });

    socket.on("purchaseUpgrade", async (gameId: number, upgrade: number) => {
      try {
        const updatedGame = await purchaseUpgrade(gameId, upgrade);
        io.to(`game_${gameId}`).emit("gameUpdated", updatedGame);
      } catch (error) {
        socket.emit("error", { action: "purchase", error });
      }
    });
  });
};

export default gameSocket;
