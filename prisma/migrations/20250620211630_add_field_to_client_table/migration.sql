/*
  Warnings:

  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE `client` ADD COLUMN `address` TEXT NULL,
    ADD COLUMN `category` TEXT NULL,
    ADD COLUMN `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    ADD COLUMN `role` VARCHAR(50) NULL DEFAULT 'user';

-- DropTable
DROP TABLE `user`;
