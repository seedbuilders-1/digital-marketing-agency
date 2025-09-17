/*
  Warnings:

  - You are about to alter the column `name` on the `organisation` table. The data in that column could be lost. The data in that column will be cast from `VarChar(450)` to `VarChar(100)`.
  - You are about to alter the column `email` on the `organisation` table. The data in that column could be lost. The data in that column will be cast from `VarChar(350)` to `VarChar(255)`.
  - You are about to drop the column `user_id` on the `service` table. All the data in the column will be lost.
  - You are about to drop the column `organisation_id` on the `testimonial` table. All the data in the column will be lost.
  - You are about to alter the column `name` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(100)`.
  - You are about to alter the column `email` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(350)` to `VarChar(255)`.
  - You are about to alter the column `tel` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(50)` to `VarChar(20)`.
  - You are about to alter the column `country` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(200)` to `VarChar(64)`.
  - You are about to alter the column `role` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(50)` to `VarChar(10)`.
  - You are about to alter the column `status` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(50)` to `VarChar(10)`.
  - You are about to drop the `lead` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ptoken` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `country` on table `organisation` required. This step will fail if there are existing NULL values in that column.
  - Made the column `industry` on table `organisation` required. This step will fail if there are existing NULL values in that column.
  - Made the column `logo_url` on table `organisation` required. This step will fail if there are existing NULL values in that column.
  - Made the column `rc_number` on table `organisation` required. This step will fail if there are existing NULL values in that column.
  - Made the column `staff_size` on table `organisation` required. This step will fail if there are existing NULL values in that column.
  - Made the column `type` on table `organisation` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `organisation` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `admin_id` to the `service` table without a default value. This is not possible if the table is not empty.
  - Added the required column `service_id` to the `testimonial` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `contact` DROP FOREIGN KEY `fk_contact_organisation_id`;

-- DropForeignKey
ALTER TABLE `lead` DROP FOREIGN KEY `fk_organisation_id`;

-- DropForeignKey
ALTER TABLE `lead` DROP FOREIGN KEY `fk_user_id`;

-- DropForeignKey
ALTER TABLE `notification` DROP FOREIGN KEY `fk_n_user_id`;

-- DropForeignKey
ALTER TABLE `organisation` DROP FOREIGN KEY `fk_org_user_id`;

-- DropForeignKey
ALTER TABLE `otp` DROP FOREIGN KEY `fk_otp_user_id`;

-- DropForeignKey
ALTER TABLE `ptoken` DROP FOREIGN KEY `ptoken_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `service` DROP FOREIGN KEY `fk_contact_user_id`;

-- DropForeignKey
ALTER TABLE `testimonial` DROP FOREIGN KEY `fk_t_organisation_id`;

-- DropForeignKey
ALTER TABLE `testimonial` DROP FOREIGN KEY `fk_t_user_id`;

-- DropIndex
DROP INDEX `fk_contact_user_id` ON `service`;

-- DropIndex
DROP INDEX `fk_t_organisation_id` ON `testimonial`;

-- AlterTable
ALTER TABLE `contact` MODIFY `name` VARCHAR(100) NOT NULL;

-- AlterTable
ALTER TABLE `organisation` MODIFY `name` VARCHAR(100) NOT NULL,
    MODIFY `email` VARCHAR(255) NOT NULL,
    MODIFY `country` VARCHAR(64) NOT NULL,
    MODIFY `industry` TEXT NOT NULL,
    MODIFY `logo_url` TEXT NOT NULL,
    MODIFY `rc_number` VARCHAR(20) NOT NULL,
    MODIFY `staff_size` VARCHAR(15) NOT NULL,
    MODIFY `type` VARCHAR(50) NOT NULL,
    MODIFY `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0);

-- AlterTable
ALTER TABLE `service` DROP COLUMN `user_id`,
    ADD COLUMN `admin_id` INTEGER UNSIGNED NOT NULL,
    MODIFY `title` VARCHAR(100) NOT NULL,
    MODIFY `subtitle` VARCHAR(100) NOT NULL;

-- AlterTable
ALTER TABLE `testimonial` DROP COLUMN `organisation_id`,
    ADD COLUMN `service_id` INTEGER UNSIGNED NOT NULL;

-- AlterTable
ALTER TABLE `user` MODIFY `name` VARCHAR(100) NOT NULL,
    MODIFY `email` VARCHAR(255) NOT NULL,
    MODIFY `tel` VARCHAR(20) NOT NULL,
    MODIFY `country` VARCHAR(64) NOT NULL,
    MODIFY `category` VARCHAR(15) NOT NULL,
    MODIFY `role` VARCHAR(10) NOT NULL DEFAULT 'user',
    MODIFY `status` VARCHAR(10) NOT NULL DEFAULT 'unverified';

-- DropTable
DROP TABLE `lead`;

-- DropTable
DROP TABLE `ptoken`;

-- CreateTable
CREATE TABLE `service_request` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `message` TEXT NOT NULL,
    `service_id` INTEGER UNSIGNED NOT NULL,
    `user_id` INTEGER UNSIGNED NOT NULL,

    INDEX `service_request_user_id_idx`(`user_id`),
    INDEX `service_request_service_id_idx`(`service_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `password_token` (
    `id` VARCHAR(191) NOT NULL,
    `token` TEXT NOT NULL,
    `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `expires_at` TIMESTAMP(0) NULL,
    `user_id` INTEGER UNSIGNED NOT NULL,

    INDEX `password_token_user_id_idx`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `service_admin_id_idx` ON `service`(`admin_id`);

-- CreateIndex
CREATE INDEX `testimonial_service_id_idx` ON `testimonial`(`service_id`);

-- AddForeignKey
ALTER TABLE `organisation` ADD CONSTRAINT `organisation_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`);

-- AddForeignKey
ALTER TABLE `service` ADD CONSTRAINT `service_admin_id_fkey` FOREIGN KEY (`admin_id`) REFERENCES `user`(`id`);

-- AddForeignKey
ALTER TABLE `service_request` ADD CONSTRAINT `service_request_service_id_fkey` FOREIGN KEY (`service_id`) REFERENCES `service`(`id`);

-- AddForeignKey
ALTER TABLE `service_request` ADD CONSTRAINT `service_request_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE;

-- AddForeignKey
ALTER TABLE `testimonial` ADD CONSTRAINT `testimonial_service_id_fkey` FOREIGN KEY (`service_id`) REFERENCES `service`(`id`);

-- AddForeignKey
ALTER TABLE `testimonial` ADD CONSTRAINT `testimonial_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`);

-- AddForeignKey
ALTER TABLE `contact` ADD CONSTRAINT `contact_organisation_id_fkey` FOREIGN KEY (`organisation_id`) REFERENCES `organisation`(`id`);

-- AddForeignKey
ALTER TABLE `otp` ADD CONSTRAINT `otp_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE;

-- AddForeignKey
ALTER TABLE `password_token` ADD CONSTRAINT `password_token_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE;

-- AddForeignKey
ALTER TABLE `notification` ADD CONSTRAINT `notification_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE;

-- RenameIndex
ALTER TABLE `contact` RENAME INDEX `fk_contact_user_id` TO `contact_organisation_id_idx`;

-- RenameIndex
ALTER TABLE `notification` RENAME INDEX `fk_n_user_id` TO `notification_user_id_idx`;

-- RenameIndex
ALTER TABLE `organisation` RENAME INDEX `fk_org_user_id` TO `organisation_user_id_idx`;

-- RenameIndex
ALTER TABLE `otp` RENAME INDEX `fk_otp_user_id` TO `otp_user_id_idx`;

-- RenameIndex
ALTER TABLE `subscription` RENAME INDEX `subscription_plan_id_fkey` TO `subscription_plan_id_idx`;

-- RenameIndex
ALTER TABLE `subscription` RENAME INDEX `subscription_user_id_fkey` TO `subscription_user_id_idx`;

-- RenameIndex
ALTER TABLE `testimonial` RENAME INDEX `fk_t_user_id` TO `testimonial_user_id_idx`;
