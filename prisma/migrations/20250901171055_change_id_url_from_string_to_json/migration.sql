/*
  Warnings:

  - You are about to alter the column `id_url` on the `user` table. The data in that column could be lost. The data in that column will be cast from `LongText` to `Json`.

*/
-- AlterTable
ALTER TABLE `user` MODIFY `id_url` JSON NULL;
