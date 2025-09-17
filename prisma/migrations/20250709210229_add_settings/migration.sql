-- CreateTable
CREATE TABLE `privacy_settings` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `ads` BOOLEAN NOT NULL DEFAULT true,
    `data_sharing` BOOLEAN NOT NULL DEFAULT true,
    `marketing_status` BOOLEAN NOT NULL DEFAULT true,
    `activity_status` BOOLEAN NOT NULL DEFAULT true,
    `user_id` INTEGER UNSIGNED NOT NULL,

    INDEX `privacy_settings_user_id_idx`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `notification_settings` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `alerts` BOOLEAN NOT NULL DEFAULT true,
    `messages` BOOLEAN NOT NULL DEFAULT true,
    `updates` BOOLEAN NOT NULL DEFAULT true,
    `billing_alerts` BOOLEAN NOT NULL DEFAULT true,
    `email` BOOLEAN NOT NULL DEFAULT true,
    `in_app` BOOLEAN NOT NULL DEFAULT true,
    `user_id` INTEGER UNSIGNED NOT NULL,

    INDEX `notification_settings_user_id_idx`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `privacy_settings` ADD CONSTRAINT `privacy_settings_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE;

-- AddForeignKey
ALTER TABLE `notification_settings` ADD CONSTRAINT `notification_settings_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE;
