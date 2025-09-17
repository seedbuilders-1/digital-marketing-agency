/*
  Warnings:

  - You are about to alter the column `stars` on the `testimonial` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Decimal(2,1)`.

*/
-- AlterTable
ALTER TABLE `testimonial` MODIFY `stars` DECIMAL(2, 1) NOT NULL;
