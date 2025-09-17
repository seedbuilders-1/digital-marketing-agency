/*
  Warnings:

  - The primary key for the `contact` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `contact` table. The data in that column could be lost. The data in that column will be cast from `UnsignedInt` to `Char(36)`.
  - You are about to alter the column `organisation_id` on the `contact` table. The data in that column could be lost. The data in that column will be cast from `UnsignedInt` to `Char(36)`.
  - The primary key for the `notification` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `notification` table. The data in that column could be lost. The data in that column will be cast from `UnsignedInt` to `Char(36)`.
  - You are about to alter the column `user_id` on the `notification` table. The data in that column could be lost. The data in that column will be cast from `UnsignedInt` to `Char(36)`.
  - The primary key for the `notification_settings` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `notification_settings` table. The data in that column could be lost. The data in that column will be cast from `UnsignedInt` to `Char(36)`.
  - You are about to alter the column `user_id` on the `notification_settings` table. The data in that column could be lost. The data in that column will be cast from `UnsignedInt` to `Char(36)`.
  - The primary key for the `organisation` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `organisation` table. The data in that column could be lost. The data in that column will be cast from `UnsignedInt` to `Char(36)`.
  - You are about to alter the column `user_id` on the `organisation` table. The data in that column could be lost. The data in that column will be cast from `UnsignedInt` to `Char(36)`.
  - You are about to alter the column `user_id` on the `otp` table. The data in that column could be lost. The data in that column will be cast from `UnsignedInt` to `Char(36)`.
  - You are about to alter the column `user_id` on the `password_token` table. The data in that column could be lost. The data in that column will be cast from `UnsignedInt` to `Char(36)`.
  - The primary key for the `plan` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `plan` table. The data in that column could be lost. The data in that column will be cast from `UnsignedInt` to `Char(36)`.
  - You are about to alter the column `user_id` on the `privacy_settings` table. The data in that column could be lost. The data in that column will be cast from `UnsignedInt` to `Char(36)`.
  - The primary key for the `role` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `role` table. The data in that column could be lost. The data in that column will be cast from `UnsignedInt` to `Char(36)`.
  - You are about to alter the column `created_by` on the `role` table. The data in that column could be lost. The data in that column will be cast from `UnsignedInt` to `Char(36)`.
  - The primary key for the `service` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `service` table. The data in that column could be lost. The data in that column will be cast from `UnsignedInt` to `Char(36)`.
  - You are about to alter the column `admin_id` on the `service` table. The data in that column could be lost. The data in that column will be cast from `UnsignedInt` to `Char(36)`.
  - You are about to alter the column `service_id` on the `service_request` table. The data in that column could be lost. The data in that column will be cast from `UnsignedInt` to `Char(36)`.
  - You are about to alter the column `user_id` on the `service_request` table. The data in that column could be lost. The data in that column will be cast from `UnsignedInt` to `Char(36)`.
  - The primary key for the `subscription` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `subscription` table. The data in that column could be lost. The data in that column will be cast from `UnsignedInt` to `Char(36)`.
  - You are about to alter the column `user_id` on the `subscription` table. The data in that column could be lost. The data in that column will be cast from `UnsignedInt` to `Char(36)`.
  - You are about to alter the column `plan_id` on the `subscription` table. The data in that column could be lost. The data in that column will be cast from `UnsignedInt` to `Char(36)`.
  - You are about to alter the column `user_id` on the `testimonial` table. The data in that column could be lost. The data in that column will be cast from `UnsignedInt` to `Char(36)`.
  - You are about to alter the column `service_id` on the `testimonial` table. The data in that column could be lost. The data in that column will be cast from `UnsignedInt` to `Char(36)`.
  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `user` table. The data in that column could be lost. The data in that column will be cast from `UnsignedInt` to `Char(36)`.
  - You are about to alter the column `role_id` on the `user` table. The data in that column could be lost. The data in that column will be cast from `UnsignedInt` to `Char(36)`.

*/
-- DropForeignKey
ALTER TABLE `contact` DROP FOREIGN KEY `contact_organisation_id_fkey`;

-- DropForeignKey
ALTER TABLE `notification` DROP FOREIGN KEY `notification_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `notification_settings` DROP FOREIGN KEY `notification_settings_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `organisation` DROP FOREIGN KEY `organisation_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `otp` DROP FOREIGN KEY `otp_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `password_token` DROP FOREIGN KEY `password_token_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `privacy_settings` DROP FOREIGN KEY `privacy_settings_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `role` DROP FOREIGN KEY `role_created_by_fkey`;

-- DropForeignKey
ALTER TABLE `service` DROP FOREIGN KEY `service_admin_id_fkey`;

-- DropForeignKey
ALTER TABLE `service_request` DROP FOREIGN KEY `service_request_service_id_fkey`;

-- DropForeignKey
ALTER TABLE `service_request` DROP FOREIGN KEY `service_request_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `subscription` DROP FOREIGN KEY `subscription_plan_id_fkey`;

-- DropForeignKey
ALTER TABLE `subscription` DROP FOREIGN KEY `subscription_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `testimonial` DROP FOREIGN KEY `testimonial_service_id_fkey`;

-- DropForeignKey
ALTER TABLE `testimonial` DROP FOREIGN KEY `testimonial_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `user_role_id_fkey`;

-- DropIndex
DROP INDEX `user_role_id_fkey` ON `user`;

-- AlterTable
ALTER TABLE `contact` DROP PRIMARY KEY,
    MODIFY `id` CHAR(36) NOT NULL,
    MODIFY `organisation_id` CHAR(36) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `notification` DROP PRIMARY KEY,
    MODIFY `id` CHAR(36) NOT NULL,
    MODIFY `user_id` CHAR(36) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `notification_settings` DROP PRIMARY KEY,
    MODIFY `id` CHAR(36) NOT NULL,
    MODIFY `user_id` CHAR(36) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `organisation` DROP PRIMARY KEY,
    MODIFY `id` CHAR(36) NOT NULL,
    MODIFY `user_id` CHAR(36) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `otp` MODIFY `user_id` CHAR(36) NOT NULL;

-- AlterTable
ALTER TABLE `password_token` MODIFY `user_id` CHAR(36) NOT NULL;

-- AlterTable
ALTER TABLE `plan` DROP PRIMARY KEY,
    MODIFY `id` CHAR(36) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `privacy_settings` MODIFY `user_id` CHAR(36) NOT NULL;

-- AlterTable
ALTER TABLE `role` DROP PRIMARY KEY,
    MODIFY `id` CHAR(36) NOT NULL,
    MODIFY `created_by` CHAR(36) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `service` DROP PRIMARY KEY,
    MODIFY `id` CHAR(36) NOT NULL,
    MODIFY `admin_id` CHAR(36) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `service_request` MODIFY `service_id` CHAR(36) NOT NULL,
    MODIFY `user_id` CHAR(36) NOT NULL;

-- AlterTable
ALTER TABLE `subscription` DROP PRIMARY KEY,
    MODIFY `id` CHAR(36) NOT NULL,
    MODIFY `user_id` CHAR(36) NOT NULL,
    MODIFY `plan_id` CHAR(36) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `testimonial` MODIFY `user_id` CHAR(36) NOT NULL,
    MODIFY `service_id` CHAR(36) NOT NULL;

-- AlterTable
ALTER TABLE `user` DROP PRIMARY KEY,
    MODIFY `id` CHAR(36) NOT NULL,
    MODIFY `role_id` CHAR(36) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `user` ADD CONSTRAINT `user_role_id_fkey` FOREIGN KEY (`role_id`) REFERENCES `role`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `organisation` ADD CONSTRAINT `organisation_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `service` ADD CONSTRAINT `service_admin_id_fkey` FOREIGN KEY (`admin_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `service_request` ADD CONSTRAINT `service_request_service_id_fkey` FOREIGN KEY (`service_id`) REFERENCES `service`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `service_request` ADD CONSTRAINT `service_request_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `testimonial` ADD CONSTRAINT `testimonial_service_id_fkey` FOREIGN KEY (`service_id`) REFERENCES `service`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `testimonial` ADD CONSTRAINT `testimonial_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `contact` ADD CONSTRAINT `contact_organisation_id_fkey` FOREIGN KEY (`organisation_id`) REFERENCES `organisation`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `otp` ADD CONSTRAINT `otp_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `password_token` ADD CONSTRAINT `password_token_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `notification` ADD CONSTRAINT `notification_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `privacy_settings` ADD CONSTRAINT `privacy_settings_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `notification_settings` ADD CONSTRAINT `notification_settings_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `subscription` ADD CONSTRAINT `subscription_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `subscription` ADD CONSTRAINT `subscription_plan_id_fkey` FOREIGN KEY (`plan_id`) REFERENCES `plan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `role` ADD CONSTRAINT `role_created_by_fkey` FOREIGN KEY (`created_by`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
