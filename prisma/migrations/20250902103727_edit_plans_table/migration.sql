/*
  Warnings:

  - You are about to drop the column `billing_cycle` on the `plan` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `plan` table. All the data in the column will be lost.
  - Added the required column `billing_cycle_id` to the `plan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `plan_type_id` to the `plan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `service_id` to the `plan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `plan` DROP COLUMN `billing_cycle`,
    DROP COLUMN `name`,
    ADD COLUMN `billing_cycle_id` CHAR(36) NOT NULL,
    ADD COLUMN `plan_type_id` CHAR(36) NOT NULL,
    ADD COLUMN `service_id` CHAR(36) NOT NULL;

-- CreateTable
CREATE TABLE `plan_type` (
    `id` CHAR(36) NOT NULL,
    `name` VARCHAR(20) NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `created_by` CHAR(36) NOT NULL,
    `deleted_at` TIMESTAMP(0) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `billing_cycle` (
    `id` CHAR(36) NOT NULL,
    `name` VARCHAR(20) NOT NULL,
    `duration_in_days` INTEGER NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `deleted_at` TIMESTAMP(0) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `plan_type` ADD CONSTRAINT `plan_type_created_by_fkey` FOREIGN KEY (`created_by`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `plan` ADD CONSTRAINT `plan_service_id_fkey` FOREIGN KEY (`service_id`) REFERENCES `service`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `plan` ADD CONSTRAINT `plan_plan_type_id_fkey` FOREIGN KEY (`plan_type_id`) REFERENCES `plan_type`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `plan` ADD CONSTRAINT `plan_billing_cycle_id_fkey` FOREIGN KEY (`billing_cycle_id`) REFERENCES `billing_cycle`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
