/*
  Warnings:

  - Added the required column `stars` to the `testimonial` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_title` to the `testimonial` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `testimonial` ADD COLUMN `stars` INTEGER NOT NULL,
    ADD COLUMN `user_title` TEXT NOT NULL;
