/*
  Warnings:

  - Added the required column `plan_id` to the `service_request` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `service_request` ADD COLUMN `plan_id` CHAR(36) NOT NULL;

-- CreateIndex
CREATE INDEX `service_request_plan_id_idx` ON `service_request`(`plan_id`);

-- AddForeignKey
ALTER TABLE `service_request` ADD CONSTRAINT `service_request_plan_id_fkey` FOREIGN KEY (`plan_id`) REFERENCES `plan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
