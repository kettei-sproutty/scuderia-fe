/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `Profile` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "username" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Profile_username_key" ON "Profile"("username");
