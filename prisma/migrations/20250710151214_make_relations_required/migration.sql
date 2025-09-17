/*
  Warnings:

  - Made the column `created_by` on table `role` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `role` DROP FOREIGN KEY `role_created_by_fkey`;

-- AlterTable
ALTER TABLE `role` MODIFY `created_by` INTEGER UNSIGNED NOT NULL;

-- AddForeignKey
ALTER TABLE `role` ADD CONSTRAINT `role_created_by_fkey` FOREIGN KEY (`created_by`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
