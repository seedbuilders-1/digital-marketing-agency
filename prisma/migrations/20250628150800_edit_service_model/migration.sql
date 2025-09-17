/*
  Warnings:

  - You are about to drop the column `organisation_id` on the `service` table. All the data in the column will be lost.
  - Added the required column `imageURL` to the `service` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subtitle` to the `service` table without a default value. This is not possible if the table is not empty.

*/

-- DropForeignKey
ALTER TABLE `service` DROP FOREIGN KEY `fk_service_organisation_id`;

-- DropIndex
DROP INDEX `fk_service_organisation_id` ON `service`;

-- AlterTable
ALTER TABLE `service` DROP COLUMN `organisation_id`,
    ADD COLUMN `imageURL` TEXT NOT NULL,
    ADD COLUMN `subtitle` TEXT NOT NULL;
