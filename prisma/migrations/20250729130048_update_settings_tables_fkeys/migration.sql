-- DropForeignKey
ALTER TABLE `notification_settings` DROP FOREIGN KEY `notification_settings_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `privacy_settings` DROP FOREIGN KEY `privacy_settings_user_id_fkey`;

-- AddForeignKey
ALTER TABLE `privacy_settings` ADD CONSTRAINT `privacy_settings_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `notification_settings` ADD CONSTRAINT `notification_settings_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
