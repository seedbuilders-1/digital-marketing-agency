-- CreateIndex
CREATE INDEX `fk_contact_user_id` ON `service`(`user_id`);

-- AddForeignKey
ALTER TABLE `service` ADD CONSTRAINT `fk_contact_user_id` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
