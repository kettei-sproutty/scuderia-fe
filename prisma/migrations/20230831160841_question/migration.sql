/*
  Warnings:

  - You are about to drop the column `author_id` on the `Answer` table. All the data in the column will be lost.
  - You are about to drop the column `question_id` on the `Answer` table. All the data in the column will be lost.
  - You are about to drop the column `workshopId` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `workshop_id` on the `Question` table. All the data in the column will be lost.
  - Added the required column `authorId` to the `Answer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `questionId` to the `Answer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `authorId` to the `Question` table without a default value. This is not possible if the table is not empty.
  - Added the required column `workshopId` to the `Question` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Answer" DROP CONSTRAINT "Answer_author_id_fkey";

-- DropForeignKey
ALTER TABLE "Answer" DROP CONSTRAINT "Answer_question_id_fkey";

-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_questionId_fkey";

-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_workshopId_fkey";

-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_workshop_id_fkey";

-- AlterTable
ALTER TABLE "Answer" DROP COLUMN "author_id",
DROP COLUMN "question_id",
ADD COLUMN     "authorId" TEXT NOT NULL,
ADD COLUMN     "questionId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "workshopId";

-- AlterTable
ALTER TABLE "Question" DROP COLUMN "workshop_id",
ADD COLUMN     "authorId" TEXT NOT NULL,
ADD COLUMN     "workshopId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_workshopId_fkey" FOREIGN KEY ("workshopId") REFERENCES "Workshop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Answer" ADD CONSTRAINT "Answer_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Answer" ADD CONSTRAINT "Answer_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
