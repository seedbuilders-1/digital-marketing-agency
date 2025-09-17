-- DropForeignKey
ALTER TABLE `contact` DROP FOREIGN KEY `contact_organisation_id_fkey`;

-- DropForeignKey
ALTER TABLE `notification` DROP FOREIGN KEY `notification_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `organisation` DROP FOREIGN KEY `organisation_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `otp` DROP FOREIGN KEY `otp_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `password_token` DROP FOREIGN KEY `password_token_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `service` DROP FOREIGN KEY `service_admin_id_fkey`;

-- DropForeignKey
ALTER TABLE `service_request` DROP FOREIGN KEY `service_request_service_id_fkey`;

-- DropForeignKey
ALTER TABLE `service_request` DROP FOREIGN KEY `service_request_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `testimonial` DROP FOREIGN KEY `testimonial_service_id_fkey`;

-- DropForeignKey
ALTER TABLE `testimonial` DROP FOREIGN KEY `testimonial_user_id_fkey`;

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
