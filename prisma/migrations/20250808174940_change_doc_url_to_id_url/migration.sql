/*
  Warnings:

  - You are about to drop the column `doc_url` on the `contact` table. All the data in the column will be lost.
  - You are about to drop the column `doc_url` on the `user` table. All the data in the column will be lost.
  - Added the required column `id_url` to the `contact` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `contact` DROP COLUMN `doc_url`,
    ADD COLUMN `id_url` JSON NOT NULL;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `doc_url`,
    ADD COLUMN `id_url` JSON NULL;
