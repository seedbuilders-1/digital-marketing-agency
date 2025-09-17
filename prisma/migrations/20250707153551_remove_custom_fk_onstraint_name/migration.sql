-- DropForeignKey
ALTER TABLE `ptoken` DROP FOREIGN KEY `fk_token_user_id`;

-- AddForeignKey
ALTER TABLE `ptoken` ADD CONSTRAINT `ptoken_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE;

-- RenameIndex
ALTER TABLE `ptoken` RENAME INDEX `fk_token_user_id` TO `ptoken_user_id_idx`;
