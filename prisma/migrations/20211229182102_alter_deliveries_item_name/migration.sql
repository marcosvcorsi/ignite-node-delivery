/*
  Warnings:

  - You are about to drop the column `item_name` on the `deliveries` table. All the data in the column will be lost.
  - Added the required column `itemName` to the `deliveries` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "deliveries" DROP COLUMN "item_name",
ADD COLUMN     "itemName" TEXT NOT NULL;
