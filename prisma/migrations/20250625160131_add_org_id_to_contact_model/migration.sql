/*
  Warnings:

  - Added the required column `organisation_id` to the `contact` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `contact` ADD COLUMN `organisation_id` INTEGER UNSIGNED NOT NULL;

-- CreateIndex
CREATE INDEX `fk_contact_client_id` ON `contact`(`organisation_id`);

-- AddForeignKey
ALTER TABLE `contact` ADD CONSTRAINT `fk_contact_organisation_id` FOREIGN KEY (`organisation_id`) REFERENCES `organisation`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
