-- CreateTable
CREATE TABLE `client` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(350) NOT NULL,
    `tel` VARCHAR(50) NOT NULL,
    `country` VARCHAR(200) NOT NULL,
    `password` TEXT NOT NULL,

    UNIQUE INDEX `email`(`email`),
    UNIQUE INDEX `tel`(`tel`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `lead` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `message` TEXT NOT NULL,
    `service_interested` TEXT NOT NULL,
    `organisation_id` INTEGER UNSIGNED NOT NULL,
    `client_id` INTEGER UNSIGNED NOT NULL,

    INDEX `fk_client_id`(`client_id`),
    INDEX `fk_organisation_id`(`organisation_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `organisation` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(450) NOT NULL,
    `email` VARCHAR(350) NOT NULL,
    `tel` VARCHAR(50) NOT NULL,
    `website` TEXT NOT NULL,
    `address` TEXT NOT NULL,
    `password` TEXT NOT NULL,

    UNIQUE INDEX `email`(`email`),
    UNIQUE INDEX `tel`(`tel`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `service` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `title` TEXT NOT NULL,
    `description` TEXT NOT NULL,
    `organisation_id` INTEGER UNSIGNED NOT NULL,

    INDEX `fk_service_organisation_id`(`organisation_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `testimonial` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `message` TEXT NOT NULL,
    `client_id` INTEGER UNSIGNED NOT NULL,
    `organisation_id` INTEGER UNSIGNED NOT NULL,

    INDEX `fk_t_client_id`(`client_id`),
    INDEX `fk_t_organisation_id`(`organisation_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(255) NOT NULL,
    `password` TEXT NOT NULL,
    `role` VARCHAR(50) NULL DEFAULT 'user',
    `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `email`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `lead` ADD CONSTRAINT `fk_client_id` FOREIGN KEY (`client_id`) REFERENCES `client`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `lead` ADD CONSTRAINT `fk_organisation_id` FOREIGN KEY (`organisation_id`) REFERENCES `organisation`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `service` ADD CONSTRAINT `fk_service_organisation_id` FOREIGN KEY (`organisation_id`) REFERENCES `organisation`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `testimonial` ADD CONSTRAINT `fk_t_client_id` FOREIGN KEY (`client_id`) REFERENCES `client`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `testimonial` ADD CONSTRAINT `fk_t_organisation_id` FOREIGN KEY (`organisation_id`) REFERENCES `organisation`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

