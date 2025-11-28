import prisma from "../prisma/client";

export const getGame = async () => {
  let game = await prisma.game.findFirst();
  if (!game) {
    game = await prisma.game.create({});
  }
  return game;
};

export const click = async () => {
  let game = await prisma.game.findFirst();
  if (!game) {
    game = await prisma.game.create({});
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
