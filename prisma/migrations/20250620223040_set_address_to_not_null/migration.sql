/*
  Warnings:

  - Made the column `address` on table `client` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `client` MODIFY `address` TEXT NOT NULL;
