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
      hotChocolates:
        game.hotChocolates +
        game.hotChocolatesPerClick * game.hotChocolatesPerClickMultiplier,
      allTimeHotChocolates:
        game.allTimeHotChocolates +
        game.hotChocolatesPerClick * game.hotChocolatesPerClickMultiplier,
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
    1: { upgradeEffect: "clicks", upgradeWeight: 15, amount: game.upgrade1 },
    2: { upgradeEffect: "perSecond", upgradeWeight: 80, amount: game.upgrade2 },
    3: {
      upgradeEffect: "perSecond",
      upgradeWeight: 300,
      amount: game.upgrade3,
    },
    4: {
      upgradeEffect: "perSecond",
      upgradeWeight: 1000,
      amount: game.upgrade4,
    },
    5: {
      upgradeEffect: "perSecond",
      upgradeWeight: 20000,
      amount: game.upgrade5,
    },
    6: {
      upgradeEffect: "perSecond",
      upgradeWeight: 130000,
      amount: game.upgrade6,
    },
    7: {
      upgradeEffect: "perSecond",
      upgradeWeight: 750000,
      amount: game.upgrade7,
    },
    8: {
      upgradeEffect: "perSecond",
      upgradeWeight: 1000000,
      amount: game.upgrade8,
    },
    9: {
      upgradeEffect: "perSecond",
      upgradeWeight: 15000000,
      amount: game.upgrade9,
    },
    10: {
      upgradeEffect: "perSecond",
      upgradeWeight: 64000000,
      amount: game.upgrade10,
    },
    11: {
      upgradeEffect: "perSecond",
      upgradeWeight: 100000000,
      amount: game.upgrade11,
    },
  };
  if (!Object.keys(upgradeMap).includes(String(upgrade))) {
    throw new Error("Upgrade not found");
  }
  const upgradeData =
    upgradeMap[upgrade as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11];
  const price = Math.round(
    105.36 ** (0.6 + upgrade * 0.4) * 1.4 ** upgradeData.amount
  );
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

export const purchaseBooster = async (id: number, booster: number) => {
  const game = await prisma.game.findUnique({
    where: { id },
  });
  if (!game) {
    throw new Error("Game not found");
  }
  if (game.purchasedBoosters.includes(booster)) {
    throw new Error("Booster already purchased");
  }
  // All of these will be affecting amount per click since I think it was way too easy when the upgrades had lots of effects on per click
  const boosterMap = {
    1: { price: 5000, effect: 2 },
    2: { price: 150000, effect: 2 },
    3: { price: 75000000, effect: 3 },
    4: { price: 3000000000, effect: 2 },
    5: { price: 600000000000, effect: 4 },
  };
  if (!Object.keys(boosterMap).includes(String(booster))) {
    throw new Error("Booster not found");
  }
  const boosterData = boosterMap[booster as 1 | 2 | 3 | 4 | 5];
  if (boosterData.price > game.hotChocolates) {
    throw new Error("Can't afford this booster");
  }
  const updatedGame = await prisma.game.update({
    where: { id: game.id },
    data: {
      hotChocolates: game.hotChocolates - boosterData.price,
      hotChocolatesPerClickMultiplier:
        game.hotChocolatesPerClickMultiplier * boosterData.effect,
      purchasedBoosters: {
        push: booster,
      },
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
