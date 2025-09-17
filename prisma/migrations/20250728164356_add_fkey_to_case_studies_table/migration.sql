-- CreateIndex
CREATE INDEX `case_studies_organisation_id_idx` ON `case_studies`(`organisation_id`);

-- CreateIndex
CREATE INDEX `case_studies_service_id_idx` ON `case_studies`(`service_id`);

-- AddForeignKey
ALTER TABLE `case_studies` ADD CONSTRAINT `case_studies_service_id_fkey` FOREIGN KEY (`service_id`) REFERENCES `service`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `case_studies` ADD CONSTRAINT `case_studies_organisation_id_fkey` FOREIGN KEY (`organisation_id`) REFERENCES `organisation`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
