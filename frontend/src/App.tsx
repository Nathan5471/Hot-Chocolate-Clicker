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
  const [game, setGame] = useState<Game | null>(null);

  useEffect(() => {
    socket.on("gameRetrieved", (game: Game) => {
      setGame(game);
    });

    socket.on("gameUpdated", (game: Game) => {
      setGame(game);
    });
  }, []);

  const clickButton = () => {
    socket.emit("click");
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
    socket.emit("purchaseUpgrade", upgrade);
  };

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
                Upgrade #1 ({game.upgrade1})
              </h2>
              <p className="ml-auto">
                {Math.round(5 ** 1 * 1.25 ** game.upgrade1)} HCs
              </p>
            </div>
            <p>This does some cool stuff</p>
          </button>
          <button
            className="w-full h-20 flex flex-col bg-primary-a2 hover:bg-primary-a3 transition-colors rounded-lg p-2"
            onClick={() => purchaseUpgrade(2)}
          >
            <div className="flex flex-row w-full">
              <h2 className="text-lg text-left font-bold">
                Upgrade #2 ({game.upgrade2})
              </h2>
              <p className="ml-auto">
                {Math.round(5 ** 2 * 1.25 ** game.upgrade2)} HCs
              </p>
            </div>
            <p>This does some cool stuff</p>
          </button>
          <button
            className="w-full h-20 flex flex-col bg-primary-a2 hover:bg-primary-a3 transition-colors rounded-lg p-2"
            onClick={() => purchaseUpgrade(3)}
          >
            <div className="flex flex-row w-full">
              <h2 className="text-lg text-left font-bold">
                Upgrade #3 ({game.upgrade3})
              </h2>
              <p className="ml-auto">
                {Math.round(5 ** 3 * 1.25 ** game.upgrade3)} HCs
              </p>
            </div>
            <p>This does some cool stuff</p>
          </button>
          <button
            className="w-full h-20 flex flex-col bg-primary-a2 hover:bg-primary-a3 transition-colors rounded-lg p-2"
            onClick={() => purchaseUpgrade(4)}
          >
            <div className="flex flex-row w-full">
              <h2 className="text-lg text-left font-bold">
                Upgrade #4 ({game.upgrade4})
              </h2>
              <p className="ml-auto">
                {Math.round(5 ** 4 * 1.25 ** game.upgrade4)} HCs
              </p>
            </div>
            <p>This does some cool stuff</p>
          </button>
          <button
            className="w-full h-20 flex flex-col bg-primary-a2 hover:bg-primary-a3 transition-colors rounded-lg p-2"
            onClick={() => purchaseUpgrade(5)}
          >
            <div className="flex flex-row w-full">
              <h2 className="text-lg text-left font-bold">
                Upgrade #5 ({game.upgrade5})
              </h2>
              <p className="ml-auto">
                {Math.round(5 ** 5 * 1.25 ** game.upgrade5)} HCs
              </p>
            </div>
            <p>This does some cool stuff</p>
          </button>
          <button
            className="w-full h-20 flex flex-col bg-primary-a2 hover:bg-primary-a3 transition-colors rounded-lg p-2"
            onClick={() => purchaseUpgrade(6)}
          >
            <div className="flex flex-row w-full">
              <h2 className="text-lg text-left font-bold">
                Upgrade #6 ({game.upgrade6})
              </h2>
              <p className="ml-auto">
                {Math.round(5 ** 6 * 1.25 ** game.upgrade6)} HCs
              </p>
            </div>
            <p>This does some cool stuff</p>
          </button>
          <button
            className="w-full h-20 flex flex-col bg-primary-a2 hover:bg-primary-a3 transition-colors rounded-lg p-2"
            onClick={() => purchaseUpgrade(7)}
          >
            <div className="flex flex-row w-full">
              <h2 className="text-lg text-left font-bold">
                Upgrade #7 ({game.upgrade7})
              </h2>
              <p className="ml-auto">
                {Math.round(5 ** 7 * 1.25 ** game.upgrade7)} HCs
              </p>
            </div>
            <p>This does some cool stuff</p>
          </button>
          <button
            className="w-full h-20 flex flex-col bg-primary-a2 hover:bg-primary-a3 transition-colors rounded-lg p-2"
            onClick={() => purchaseUpgrade(8)}
          >
            <div className="flex flex-row w-full">
              <h2 className="text-lg text-left font-bold">
                Upgrade #8 ({game.upgrade8})
              </h2>
              <p className="ml-auto">
                {Math.round(5 ** 8 * 1.25 ** game.upgrade8)} HCs
              </p>
            </div>
            <p>This does some cool stuff</p>
          </button>
          <button
            className="w-full h-20 flex flex-col bg-primary-a2 hover:bg-primary-a3 transition-colors rounded-lg p-2"
            onClick={() => purchaseUpgrade(9)}
          >
            <div className="flex flex-row w-full">
              <h2 className="text-lg text-left font-bold">
                Upgrade #9 ({game.upgrade9})
              </h2>
              <p className="ml-auto">
                {Math.round(5 ** 9 * 1.25 ** game.upgrade9)} HCs
              </p>
            </div>
            <p>This does some cool stuff</p>
          </button>
          <button
            className="w-full h-20 flex flex-col bg-primary-a2 hover:bg-primary-a3 transition-colors rounded-lg p-2"
            onClick={() => purchaseUpgrade(10)}
          >
            <div className="flex flex-row w-full">
              <h2 className="text-lg text-left font-bold">
                Upgrade #10 ({game.upgrade10})
              </h2>
              <p className="ml-auto">
                {Math.round(5 ** 10 * 1.25 ** game.upgrade10)} HCs
              </p>
            </div>
            <p>This does some cool stuff</p>
          </button>
          <button
            className="w-full h-20 flex flex-col bg-primary-a2 hover:bg-primary-a3 transition-colors rounded-lg p-2"
            onClick={() => purchaseUpgrade(11)}
          >
            <div className="flex flex-row w-full">
              <h2 className="text-lg text-left font-bold">
                Upgrade #11 ({game.upgrade11})
              </h2>
              <p className="ml-auto">
                {Math.round(5 ** 11 * 1.25 ** game.upgrade11)} HCs
              </p>
            </div>
            <p>This does some cool stuff</p>
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
