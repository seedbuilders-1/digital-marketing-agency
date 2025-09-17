/*
  Warnings:

  - You are about to drop the column `client_id` on the `lead` table. All the data in the column will be lost.
  - You are about to drop the column `client_id` on the `organisation` table. All the data in the column will be lost.
  - You are about to drop the column `client_id` on the `otp` table. All the data in the column will be lost.
  - You are about to drop the column `client_id` on the `ptoken` table. All the data in the column will be lost.
  - You are about to drop the column `created_by` on the `service` table. All the data in the column will be lost.
  - You are about to drop the column `client_id` on the `testimonial` table. All the data in the column will be lost.
  - Added the required column `user_id` to the `lead` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `organisation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `otp` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `ptoken` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `service` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `testimonial` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `lead` DROP FOREIGN KEY `fk_user_id`;

-- DropForeignKey
ALTER TABLE `organisation` DROP FOREIGN KEY `fk_org_user_id`;

-- DropForeignKey
ALTER TABLE `otp` DROP FOREIGN KEY `fk_otp_user_id`;

-- DropForeignKey
ALTER TABLE `ptoken` DROP FOREIGN KEY `fk_token_user_id`;

-- DropForeignKey
ALTER TABLE `testimonial` DROP FOREIGN KEY `fk_t_user_id`;

-- DropIndex
DROP INDEX `fk_user_id` ON `lead`;

-- DropIndex
DROP INDEX `fk_org_user_id` ON `organisation`;

-- DropIndex
DROP INDEX `fk_otp_user_id` ON `otp`;

-- DropIndex
DROP INDEX `fk_token_user_id` ON `ptoken`;

-- DropIndex
DROP INDEX `fk_t_user_id` ON `testimonial`;

-- AlterTable
ALTER TABLE `lead` DROP COLUMN `client_id`,
    ADD COLUMN `user_id` INTEGER UNSIGNED NOT NULL;

-- AlterTable
ALTER TABLE `organisation` DROP COLUMN `client_id`,
    ADD COLUMN `user_id` INTEGER UNSIGNED NOT NULL;

-- AlterTable
ALTER TABLE `otp` DROP COLUMN `client_id`,
    ADD COLUMN `user_id` INTEGER UNSIGNED NOT NULL;

-- AlterTable
ALTER TABLE `ptoken` DROP COLUMN `client_id`,
    ADD COLUMN `user_id` INTEGER UNSIGNED NOT NULL;

-- AlterTable
ALTER TABLE `service` DROP COLUMN `created_by`,
    ADD COLUMN `user_id` INTEGER UNSIGNED NOT NULL;

-- AlterTable
ALTER TABLE `testimonial` DROP COLUMN `client_id`,
    ADD COLUMN `user_id` INTEGER UNSIGNED NOT NULL;

-- CreateIndex
CREATE INDEX `fk_user_id` ON `lead`(`user_id`);

-- CreateIndex
CREATE INDEX `fk_org_user_id` ON `organisation`(`user_id`);

-- CreateIndex
CREATE INDEX `fk_otp_user_id` ON `otp`(`user_id`);

-- CreateIndex
CREATE INDEX `fk_token_user_id` ON `ptoken`(`user_id`);

-- CreateIndex
CREATE INDEX `fk_t_user_id` ON `testimonial`(`user_id`);

-- AddForeignKey
ALTER TABLE `lead` ADD CONSTRAINT `fk_user_id` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `organisation` ADD CONSTRAINT `fk_org_user_id` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `testimonial` ADD CONSTRAINT `fk_t_user_id` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `otp` ADD CONSTRAINT `fk_otp_user_id` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `ptoken` ADD CONSTRAINT `fk_token_user_id` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
