import { useState, useEffect } from "react";
import socket from "./socket";

function App() {
  interface Game {
    id: number;
    hotChocolates: number;
    allTimeHotChocolates: number;
    hotChocolatesPerClick: number;
    hotChocolatesPerSecond: number;
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
      <div className="w-1/3 flex-col items-center bg-primary-a1 p-6">
        <h1 className="text-3xl font-bold text-center mb-2">
          {game.hotChocolates} Hot Chocolates
        </h1>
        <div className="w-full h-full overflow-y-auto flex flex-col">
          <button className="w-full h-20 flex flex-col bg-primary-a2 hover:bg-primary-a3 transition-colors rounded-lg p-2">
            <div className="flex flex-row w-full">
              <h2 className="text-lg text-left font-bold">Upgrade #1 (3)</h2>
              <p className="ml-auto">5000 HCs</p>
            </div>
            <p>This does some cool stuff</p>
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
