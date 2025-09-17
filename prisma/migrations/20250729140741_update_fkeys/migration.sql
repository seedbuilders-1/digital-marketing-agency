-- This is an empty migration.

ALTER TABLE `notification_settings` 
DROP FOREIGN KEY `notification_settings_user_id_fkey`;

ALTER TABLE `notification_settings` 
ADD CONSTRAINT `notification_settings_user_id_fkey`
FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) 
ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `privacy_settings` 
DROP FOREIGN KEY `privacy_settings_user_id_fkey`;

ALTER TABLE `privacy_settings` 
ADD CONSTRAINT `privacy_settings_user_id_fkey`
FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) 
ON DELETE CASCADE ON UPDATE CASCADE;