/*
  Warnings:

  - Added the required column `org_id` to the `boards` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "boards" ADD COLUMN     "org_id" TEXT NOT NULL;
