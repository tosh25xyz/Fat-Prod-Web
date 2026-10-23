/*
  Warnings:

  - You are about to drop the column `bkashPaymentId` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `bkashTrxId` on the `Order` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "bkashPaymentId",
DROP COLUMN "bkashTrxId";
