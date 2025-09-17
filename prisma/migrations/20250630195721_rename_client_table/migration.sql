/*
  Warnings:

  - You are about to drop the `client` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `lead` DROP FOREIGN KEY `fk_client_id`;

-- DropForeignKey
ALTER TABLE `organisation` DROP FOREIGN KEY `fk_org_client_id`;

-- DropForeignKey
ALTER TABLE `otp` DROP FOREIGN KEY `fk_otp_client_id`;

-- DropForeignKey
ALTER TABLE `ptoken` DROP FOREIGN KEY `fk_token_client_id`;

-- DropForeignKey
ALTER TABLE `testimonial` DROP FOREIGN KEY `fk_t_client_id`;

-- DropTable
DROP TABLE `client`;

-- CreateTable
CREATE TABLE `user` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(350) NOT NULL,
    `tel` VARCHAR(50) NOT NULL,
    `country` VARCHAR(200) NOT NULL,
    `address` TEXT NOT NULL,
    `category` TEXT NOT NULL,
    `role` VARCHAR(50) NOT NULL DEFAULT 'user',
    `pfp_url` TEXT NULL,
    `doc_url` TEXT NULL,
    `business_status` BOOLEAN NULL,
    `password` TEXT NOT NULL,
    `status` VARCHAR(50) NOT NULL DEFAULT 'unverified',
    `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `email`(`email`),
    UNIQUE INDEX `tel`(`tel`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `lead` ADD CONSTRAINT `fk_user_id` FOREIGN KEY (`client_id`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `organisation` ADD CONSTRAINT `fk_org_user_id` FOREIGN KEY (`client_id`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `testimonial` ADD CONSTRAINT `fk_t_user_id` FOREIGN KEY (`client_id`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `otp` ADD CONSTRAINT `fk_otp_user_id` FOREIGN KEY (`client_id`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `ptoken` ADD CONSTRAINT `fk_token_user_id` FOREIGN KEY (`client_id`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- RenameIndex
ALTER TABLE `contact` RENAME INDEX `fk_contact_client_id` TO `fk_contact_user_id`;

-- RenameIndex
ALTER TABLE `lead` RENAME INDEX `fk_client_id` TO `fk_user_id`;

-- RenameIndex
ALTER TABLE `organisation` RENAME INDEX `fk_org_client_id` TO `fk_org_user_id`;

-- RenameIndex
ALTER TABLE `otp` RENAME INDEX `fk_otp_client_id` TO `fk_otp_user_id`;

-- RenameIndex
ALTER TABLE `ptoken` RENAME INDEX `fk_token_client_id` TO `fk_token_user_id`;

-- RenameIndex
ALTER TABLE `testimonial` RENAME INDEX `fk_t_client_id` TO `fk_t_user_id`;
