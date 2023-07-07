/*
  Warnings:

  - Made the column `role` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "role" SET NOT NULL;

-- CreateTable
CREATE TABLE "QosidahDetail" (
    "id" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "lyrics" TEXT NOT NULL,
    "lyricsLatin" TEXT,
    "lyricsTranslate" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "qosidahId" TEXT NOT NULL,

    CONSTRAINT "QosidahDetail_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "QosidahDetail" ADD CONSTRAINT "QosidahDetail_qosidahId_fkey" FOREIGN KEY ("qosidahId") REFERENCES "Qosidah"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
