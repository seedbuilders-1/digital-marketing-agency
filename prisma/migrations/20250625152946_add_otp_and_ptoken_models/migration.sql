/*
  Warnings:

  - Made the column `category` on table `client` required. This step will fail if there are existing NULL values in that column.
  - Made the column `role` on table `client` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `client` ADD COLUMN `status` VARCHAR(50) NOT NULL DEFAULT 'unverified',
    MODIFY `category` TEXT NOT NULL,
    MODIFY `role` VARCHAR(50) NOT NULL DEFAULT 'user';

-- AlterTable
ALTER TABLE `organisation` ADD COLUMN `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0);

-- CreateTable
CREATE TABLE `otp` (
    `id` VARCHAR(191) NOT NULL,
    `client_id` INTEGER UNSIGNED NOT NULL,
    `otp` TEXT NOT NULL,
    `expires_at` TIMESTAMP(0) NULL,
    `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `fk_otp_client_id`(`client_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ptoken` (
    `id` VARCHAR(191) NOT NULL,
    `client_id` INTEGER UNSIGNED NOT NULL,
    `token` TEXT NOT NULL,
    `expires_at` TIMESTAMP(0) NULL,
    `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `fk_token_client_id`(`client_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `otp` ADD CONSTRAINT `fk_otp_client_id` FOREIGN KEY (`client_id`) REFERENCES `client`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `ptoken` ADD CONSTRAINT `fk_token_client_id` FOREIGN KEY (`client_id`) REFERENCES `client`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
