/*
  Warnings:

  - You are about to drop the column `created_at` on the `notification` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `notification` RENAME COLUMN `created_at` TO `completed_at`;
