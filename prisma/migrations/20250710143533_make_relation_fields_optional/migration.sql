-- DropForeignKey
ALTER TABLE `role` DROP FOREIGN KEY `role_created_by_fkey`;

-- AlterTable
ALTER TABLE `role` MODIFY `created_by` INTEGER UNSIGNED NULL;

-- AddForeignKey
ALTER TABLE `role` ADD CONSTRAINT `role_created_by_fkey` FOREIGN KEY (`created_by`) REFERENCES `user`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
