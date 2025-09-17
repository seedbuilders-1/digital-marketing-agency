/*
  Warnings:

  - You are about to alter the column `business_status` on the `client` table. The data in that column could be lost. The data in that column will be cast from `VarChar(5)` to `TinyInt`.

*/
-- AlterTable
ALTER TABLE `client` MODIFY `business_status` BOOLEAN NULL;
