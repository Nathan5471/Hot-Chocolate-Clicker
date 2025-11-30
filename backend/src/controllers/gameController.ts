import prisma from "../prisma/client";

export const getGames = async () => {
  const games = await prisma.game.findMany();
  return games.map((game) => game.id);
};

export const getGame = async (id: number) => {
  const game = await prisma.game.findUnique({
    where: { id },
  });
  if (!game) {
    throw new Error("Game not found");
  }
  return game;
};

export const createGame = async () => {
  const game = await prisma.game.create({});
  return game;
};

export const click = async (id: number) => {
  const game = await prisma.game.findUnique({
    where: { id },
  });
  if (!game) {
    throw new Error("Game not found");
  }
  const clickedGame = await prisma.game.update({
    where: { id: game.id },
    data: {
      hotChocolates: game.hotChocolates + game.hotChocolatesPerClick,
      allTimeHotChocolates:
        game.allTimeHotChocolates + game.hotChocolatesPerClick,
    },
  });
  return clickedGame;
};

export const purchaseUpgrade = async (id: number, upgrade: number) => {
  const game = await prisma.game.findUnique({
    where: { id },
  });
  if (!game) {
    throw new Error("Game not found");
  }
  const upgradeMap = {
    1: { upgradeEffect: "clicks", upgradeWeight: 1, amount: game.upgrade1 },
    2: { upgradeEffect: "clicks", upgradeWeight: 5, amount: game.upgrade2 },
    3: { upgradeEffect: "perSecond", upgradeWeight: 12, amount: game.upgrade3 },
    4: { upgradeEffect: "clicks", upgradeWeight: 30, amount: game.upgrade4 },
    5: { upgradeEffect: "perSecond", upgradeWeight: 50, amount: game.upgrade5 },
    6: {
      upgradeEffect: "perSecond",
      upgradeWeight: 500,
      amount: game.upgrade6,
    },
    7: { upgradeEffect: "clicks", upgradeWeight: 350, amount: game.upgrade7 },
    8: {
      upgradeEffect: "perSecond",
      upgradeWeight: 4700,
      amount: game.upgrade8,
    },
    9: {
      upgradeEffect: "perSecond",
      upgradeWeight: 60000,
      amount: game.upgrade9,
    },
    10: {
      upgradeEffect: "clicks",
      upgradeWeight: 10000,
      amount: game.upgrade10,
    },
    11: {
      upgradeEffect: "perSecond",
      upgradeWeight: 250000,
      amount: game.upgrade11,
    },
  };
  if (!Object.keys(upgradeMap).includes(String(upgrade))) {
    throw new Error("Upgrade not found");
  }
  const upgradeData =
    upgradeMap[upgrade as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11];
  // The base price is 5^upgradeNumber
  const price = Math.round(5 ** upgrade * 1.25 ** upgradeData.amount);
  if (price > game.hotChocolates) {
    throw new Error("Can't afford this upgrade");
  }
  const updatedGame = await prisma.game.update({
    where: { id: game.id },
    data: {
      hotChocolates: game.hotChocolates - price,
      hotChocolatesPerClick:
        upgradeData.upgradeEffect === "clicks"
          ? game.hotChocolatesPerClick + upgradeData.upgradeWeight
          : game.hotChocolatesPerClick,
      hotChocolatesPerSecond:
        upgradeData.upgradeEffect === "perSecond"
          ? game.hotChocolatesPerSecond + upgradeData.upgradeWeight
          : game.hotChocolatesPerSecond,
      upgrade1: upgrade === 1 ? game.upgrade1 + 1 : game.upgrade1,
      upgrade2: upgrade === 2 ? game.upgrade2 + 1 : game.upgrade2,
      upgrade3: upgrade === 3 ? game.upgrade3 + 1 : game.upgrade3,
      upgrade4: upgrade === 4 ? game.upgrade4 + 1 : game.upgrade4,
      upgrade5: upgrade === 5 ? game.upgrade5 + 1 : game.upgrade5,
      upgrade6: upgrade === 6 ? game.upgrade6 + 1 : game.upgrade6,
      upgrade7: upgrade === 7 ? game.upgrade7 + 1 : game.upgrade7,
      upgrade8: upgrade === 8 ? game.upgrade8 + 1 : game.upgrade8,
      upgrade9: upgrade === 9 ? game.upgrade9 + 1 : game.upgrade9,
      upgrade10: upgrade === 10 ? game.upgrade10 + 1 : game.upgrade10,
      upgrade11: upgrade === 11 ? game.upgrade11 + 1 : game.upgrade11,
    },
  });
  return updatedGame;
};

export const tickHotChocolatesPerSecond = async () => {
  const games = await prisma.game.findMany();
  let updatedGames = [];
  for (const game of games) {
    const updatedGame = await prisma.game.update({
      where: { id: game.id },
      data: {
        hotChocolates: game.hotChocolates + game.hotChocolatesPerSecond,
      },
    });
    updatedGames.push(updatedGame);
  }
  return updatedGames;
};
