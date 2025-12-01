-- AlterTable
ALTER TABLE "Game" ADD COLUMN     "purchasedBoosters" INTEGER[] DEFAULT ARRAY[]::INTEGER[];
