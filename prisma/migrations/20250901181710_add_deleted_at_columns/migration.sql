/*
  Warnings:

  - You are about to alter the column `id_url` on the `contact` table. The data in that column could be lost. The data in that column will be cast from `LongText` to `Json`.

*/
-- AlterTable
ALTER TABLE `contact` ADD COLUMN `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    ADD COLUMN `deleted_at` TIMESTAMP(0) NULL,
    MODIFY `id_url` JSON NOT NULL;

-- AlterTable
ALTER TABLE `role` ADD COLUMN `deleted_at` TIMESTAMP(0) NULL;

-- AlterTable
ALTER TABLE `service` ADD COLUMN `deleted_at` TIMESTAMP(0) NULL;

-- AlterTable
ALTER TABLE `testimonial` ADD COLUMN `deleted_at` TIMESTAMP(0) NULL;
