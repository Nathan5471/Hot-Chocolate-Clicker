import { useState, useEffect } from "react";
import socket from "./socket";

function App() {
  interface Game {
    id: number;
    hotChocolates: number;
    allTimeHotChocolates: number;
    hotChocolatesPerClick: number;
    hotChocolatesPerSecond: number;
    upgrade1: number;
    upgrade2: number;
    upgrade3: number;
    upgrade4: number;
    upgrade5: number;
    upgrade6: number;
    upgrade7: number;
    upgrade8: number;
    upgrade9: number;
    upgrade10: number;
    upgrade11: number;
  }
  const [gameList, setGameList] = useState<number[] | null>(null);
  const [game, setGame] = useState<Game | null>(null);
  const [playerCount, setPlayerCount] = useState<number>(0);

  useEffect(() => {
    socket.on("games", (games: number[]) => {
      setGameList(games);
    });

    socket.on("gameJoined", (game: Game) => {
      setGame(game);
    });

    socket.on("gameUpdated", (game: Game) => {
      setGame(game);
    });

    socket.on("playerCount", (newPlayerCount: number) => {
      setPlayerCount(newPlayerCount);
    });
  }, []);

  const joinGame = (gameId: number) => {
    socket.emit("joinGame", gameId);
  };

  const createGame = () => {
    socket.emit("createGame");
  };

  const clickButton = () => {
    if (!game) return;
    socket.emit("click", game.id);
  };

  const purchaseUpgrade = (upgrade: number) => {
    if (!game) return;
    if (![1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].includes(upgrade)) return;
    const upgradeAmountMap = {
      1: game.upgrade1,
      2: game.upgrade2,
      3: game.upgrade3,
      4: game.upgrade4,
      5: game.upgrade5,
      6: game.upgrade6,
      7: game.upgrade7,
      8: game.upgrade8,
      9: game.upgrade9,
      10: game.upgrade10,
      11: game.upgrade11,
    };
    const price = Math.round(
      5 ** upgrade *
        1.25 **
          upgradeAmountMap[
            upgrade as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11
          ]
    );
    if (price > game.hotChocolates) return;
    socket.emit("purchaseUpgrade", game.id, upgrade);
  };

  if (!game && !gameList) return;

  if (!game && gameList) {
    return (
      <div className="w-screen h-screen flex flex-row bg-primary-a0 items-center justify-center">
        <div className="w-1/3 h-1/2 flex flex-col items-center bg-primary-a1 rounded-lg p-4">
          <h1 className="text-2xl text-center font-bold">Available Games</h1>
          <div className="flex flex-col w-full h-full overflow-y-auto">
            {gameList.map((gameId) => (
              <div className="w-full h-15 bg-primary-a2 flex flex-row mt-2 items-center justify-center">
                <h2 className="text-lg ml-2">Game #{gameId}</h2>
                <button
                  className="ml-auto mr-2 p-2 rounded-lg bg-primary-a3 hover:bg-primary-a4 transition-colors"
                  onClick={() => joinGame(gameId)}
                >
                  Join
                </button>
              </div>
            ))}
          </div>
          <button
            className="mt-2 mb-2 p-2 rounded-lg w-full bg-primary-a2 hover:bg-primary-a3 transition-colors"
            onClick={createGame}
          >
            Create Game
          </button>
        </div>
      </div>
    );
  }

  if (!game) return;

  return (
    <div className="w-screen h-screen flex flex-row">
      <div className="w-2/3 flex flex-col items-center justify-center bg-primary-a0">
        <div className="w-1/2 aspect-square flex items-center justify-center bg-primary-a1 rounded-lg p-4">
          <img
            src="/hotChocolate.png"
            alt="Hot Chocolate"
            className="w-11/12 h-11/12 hover:scale-110 transition-transform"
            onClick={clickButton}
          />
        </div>
      </div>
      <div className="w-1/3 h-screen flex flex-col items-center bg-primary-a1 p-6">
        <h1 className="text-3xl font-bold text-center mb-2">
          {game.hotChocolates} Hot Chocolates
        </h1>
        <div className="w-full h-full overflow-y-auto flex flex-col gap-2">
          <button
            className="w-full h-20 flex flex-col bg-primary-a2 hover:bg-primary-a3 transition-colors rounded-lg p-2"
            onClick={() => purchaseUpgrade(1)}
          >
            <div className="flex flex-row w-full">
              <h2 className="text-lg text-left font-bold">
                More Chocolate ({game.upgrade1})
              </h2>
              <p className="ml-auto">
                {Math.round(105.36 ** (0.6 + 1 * 0.4) * 1.4 ** game.upgrade1)}{" "}
                HCs
              </p>
            </div>
            <p>Get 15 more hot chocolate per click</p>
          </button>
          <button
            className="w-full h-20 flex flex-col bg-primary-a2 hover:bg-primary-a3 transition-colors rounded-lg p-2"
            onClick={() => purchaseUpgrade(2)}
          >
            <div className="flex flex-row w-full">
              <h2 className="text-lg text-left font-bold">
                Better Machine ({game.upgrade2})
              </h2>
              <p className="ml-auto">
                {Math.round(105.36 ** (0.6 + 2 * 0.4) * 1.4 ** game.upgrade2)}{" "}
                HCs
              </p>
            </div>
            <p>Get 80 more hot chocolates per click</p>
          </button>
          <button
            className="w-full h-20 flex flex-col bg-primary-a2 hover:bg-primary-a3 transition-colors rounded-lg p-2"
            onClick={() => purchaseUpgrade(3)}
          >
            <div className="flex flex-row w-full">
              <h2 className="text-lg text-left font-bold">
                Automated Machine ({game.upgrade3})
              </h2>
              <p className="ml-auto">
                {Math.round(105.36 ** (0.6 + 3 * 0.4) * 1.4 ** game.upgrade3)}{" "}
                HCs
              </p>
            </div>
            <p>Make 300 hot chocholates per second</p>
          </button>
          <button
            className="w-full h-20 flex flex-col bg-primary-a2 hover:bg-primary-a3 transition-colors rounded-lg p-2"
            onClick={() => purchaseUpgrade(4)}
          >
            <div className="flex flex-row w-full">
              <h2 className="text-lg text-left font-bold">
                Extra Machine ({game.upgrade4})
              </h2>
              <p className="ml-auto">
                {Math.round(105.36 ** (0.6 + 4 * 0.4) * 1.4 ** game.upgrade4)}{" "}
                HCs
              </p>
            </div>
            <p>Get 1000 more hot chocolates per click</p>
          </button>
          <button
            className="w-full h-20 flex flex-col bg-primary-a2 hover:bg-primary-a3 transition-colors rounded-lg p-2"
            onClick={() => purchaseUpgrade(5)}
          >
            <div className="flex flex-row w-full">
              <h2 className="text-lg text-left font-bold">
                Employee ({game.upgrade5})
              </h2>
              <p className="ml-auto">
                {Math.round(105.36 ** (0.6 + 5 * 0.4) * 1.4 ** game.upgrade5)}{" "}
                HCs
              </p>
            </div>
            <p>Make 20000 hot chocolates per second</p>
          </button>
          <button
            className="w-full h-20 flex flex-col bg-primary-a2 hover:bg-primary-a3 transition-colors rounded-lg p-2"
            onClick={() => purchaseUpgrade(6)}
          >
            <div className="flex flex-row w-full">
              <h2 className="text-lg text-left font-bold">
                Shop ({game.upgrade6})
              </h2>
              <p className="ml-auto">
                {Math.round(105.36 ** (0.6 + 6 * 0.4) * 1.4 ** game.upgrade6)}{" "}
                HCs
              </p>
            </div>
            <p>Make 130000 hot chocolates per second</p>
          </button>
          <button
            className="w-full h-20 flex flex-col bg-primary-a2 hover:bg-primary-a3 transition-colors rounded-lg p-2"
            onClick={() => purchaseUpgrade(7)}
          >
            <div className="flex flex-row w-full">
              <h2 className="text-lg text-left font-bold">
                Super Machine ({game.upgrade7})
              </h2>
              <p className="ml-auto">
                {Math.round(105.36 ** (0.6 + 7 * 0.4) * 1.4 ** game.upgrade7)}{" "}
                HCs
              </p>
            </div>
            <p>Get 750000 more hot chocolates per click</p>
          </button>
          <button
            className="w-full h-20 flex flex-col bg-primary-a2 hover:bg-primary-a3 transition-colors rounded-lg p-2"
            onClick={() => purchaseUpgrade(8)}
          >
            <div className="flex flex-row w-full">
              <h2 className="text-lg text-left font-bold">
                Super Store ({game.upgrade8})
              </h2>
              <p className="ml-auto">
                {Math.round(105.36 ** (0.6 + 8 * 0.4) * 1.4 ** game.upgrade8)}{" "}
                HCs
              </p>
            </div>
            <p>Make 1000000 hot chocolates per second</p>
          </button>
          <button
            className="w-full h-20 flex flex-col bg-primary-a2 hover:bg-primary-a3 transition-colors rounded-lg p-2"
            onClick={() => purchaseUpgrade(9)}
          >
            <div className="flex flex-row w-full">
              <h2 className="text-lg text-left font-bold">
                Factory ({game.upgrade9})
              </h2>
              <p className="ml-auto">
                {Math.round(105.36 ** (0.6 + 9 * 0.4) * 1.4 ** game.upgrade9)}{" "}
                HCs
              </p>
            </div>
            <p>Make 15000000 hot chocolates per second</p>
          </button>
          <button
            className="w-full h-20 flex flex-col bg-primary-a2 hover:bg-primary-a3 transition-colors rounded-lg p-2"
            onClick={() => purchaseUpgrade(10)}
          >
            <div className="flex flex-row w-full">
              <h2 className="text-lg text-left font-bold">
                Chocolate Training ({game.upgrade10})
              </h2>
              <p className="ml-auto">
                {Math.round(105.36 ** (0.6 + 10 * 0.4) * 1.4 ** game.upgrade10)}{" "}
                HCs
              </p>
            </div>
            <p>Get 64000000 more hot chocolates per click</p>
          </button>
          <button
            className="w-full h-20 flex flex-col bg-primary-a2 hover:bg-primary-a3 transition-colors rounded-lg p-2"
            onClick={() => purchaseUpgrade(11)}
          >
            <div className="flex flex-row w-full">
              <h2 className="text-lg text-left font-bold">
                Plantation ({game.upgrade11})
              </h2>
              <p className="ml-auto">
                {Math.round(105.36 ** (0.6 + 11 * 0.4) * 1.4 ** game.upgrade11)}{" "}
                HCs
              </p>
            </div>
            <p>Make 100000000 hot chocolates per second</p>
          </button>
        </div>
      </div>
      <p className="absolute top-2 left-2 text-xl">
        {playerCount} Players Online
      </p>
    </div>
  );
}

export default App;
