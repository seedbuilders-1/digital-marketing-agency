/*
  Warnings:

  - You are about to drop the column `tel` on the `organisation` table. All the data in the column will be lost.
  - You are about to drop the column `website` on the `organisation` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[rc_number]` on the table `organisation` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `tel` ON `organisation`;

-- AlterTable
ALTER TABLE `client` ADD COLUMN `business_status` VARCHAR(5) NULL,
    ADD COLUMN `doc_url` TEXT NULL,
    ADD COLUMN `pfp_url` TEXT NULL;

-- AlterTable
ALTER TABLE `organisation` DROP COLUMN `tel`,
    DROP COLUMN `website`,
    ADD COLUMN `country` TEXT NULL,
    ADD COLUMN `industry` TEXT NULL,
    ADD COLUMN `logo_url` TEXT NULL,
    ADD COLUMN `rc_number` VARCHAR(200) NULL,
    ADD COLUMN `staff_size` TEXT NULL,
    ADD COLUMN `type` TEXT NULL;

-- CreateTable
CREATE TABLE `contact` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` TEXT NOT NULL,
    `pfp_url` TEXT NOT NULL,
    `doc_url` TEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `rc_number` ON `organisation`(`rc_number`);
