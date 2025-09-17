/*
  Warnings:

  - The primary key for the `otp` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `otp` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Char(36)`.
  - The primary key for the `password_token` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `password_token` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Char(36)`.
  - The primary key for the `privacy_settings` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `privacy_settings` table. The data in that column could be lost. The data in that column will be cast from `UnsignedInt` to `Char(36)`.
  - The primary key for the `service_request` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `service_request` table. The data in that column could be lost. The data in that column will be cast from `UnsignedInt` to `Char(36)`.
  - The primary key for the `testimonial` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `testimonial` table. The data in that column could be lost. The data in that column will be cast from `UnsignedInt` to `Char(36)`.
  - Made the column `requested_at` on table `service_request` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `otp` DROP PRIMARY KEY,
    MODIFY `id` CHAR(36) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `password_token` DROP PRIMARY KEY,
    MODIFY `id` CHAR(36) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `privacy_settings` DROP PRIMARY KEY,
    MODIFY `id` CHAR(36) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `service_request` DROP PRIMARY KEY,
    MODIFY `id` CHAR(36) NOT NULL,
    MODIFY `requested_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `testimonial` DROP PRIMARY KEY,
    MODIFY `id` CHAR(36) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- CreateTable
CREATE TABLE `case_studies` (
    `id` CHAR(36) NOT NULL,
    `banner` TEXT NOT NULL,
    `challenge` TEXT NOT NULL,
    `challenge_img` TEXT NOT NULL,
    `solution` TEXT NOT NULL,
    `solution_img` TEXT NOT NULL,
    `result` TEXT NOT NULL,
    `result_img` TEXT NOT NULL,
    `service_id` CHAR(36) NOT NULL,
    `organisation_id` CHAR(36) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
