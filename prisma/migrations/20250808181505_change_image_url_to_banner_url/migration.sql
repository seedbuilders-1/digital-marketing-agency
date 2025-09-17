/*
  Warnings:

  - You are about to drop the column `imageURL` on the `service` table. All the data in the column will be lost.
  - Added the required column `banner_url` to the `service` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `service` DROP COLUMN `imageURL`,
    ADD COLUMN `banner_url` TEXT NOT NULL;
