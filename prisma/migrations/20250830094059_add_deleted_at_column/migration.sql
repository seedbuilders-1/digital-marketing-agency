-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `user_role_id_fkey`;

-- AlterTable
ALTER TABLE `contact` MODIFY `id_url` LONGTEXT NOT NULL;

-- AlterTable
ALTER TABLE `organisation` ADD COLUMN `deleted_at` TIMESTAMP(0) NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `deleted_at` TIMESTAMP(0) NULL,
    MODIFY `id_url` LONGTEXT NULL;

-- AddForeignKey
ALTER TABLE `user` ADD CONSTRAINT `user_role_id_fkey` FOREIGN KEY (`role_id`) REFERENCES `role`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
