/*
  Warnings:

  - Added the required column `client_id` to the `organisation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `organisation` ADD COLUMN `client_id` INTEGER UNSIGNED NOT NULL;

-- CreateIndex
CREATE INDEX `fk_org_client_id` ON `organisation`(`client_id`);

-- AddForeignKey
ALTER TABLE `organisation` ADD CONSTRAINT `fk_org_client_id` FOREIGN KEY (`client_id`) REFERENCES `client`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
