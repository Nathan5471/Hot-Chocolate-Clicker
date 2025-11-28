-- CreateTable
CREATE TABLE "Game" (
    "id" SERIAL NOT NULL,
    "hotChocolates" INTEGER NOT NULL DEFAULT 0,
    "allTimeHotChocolates" INTEGER NOT NULL DEFAULT 0,
    "hotChocolatesPerSecond" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Game_pkey" PRIMARY KEY ("id")
);
