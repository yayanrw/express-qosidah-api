-- CreateEnum
CREATE TYPE "Role" AS ENUM ('User', 'Admin');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "role" "Role",
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KeywordQosidah" (
    "id" TEXT NOT NULL,
    "keyword" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "KeywordQosidah_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Qosidah" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "titleLatin" TEXT,
    "titleTranslate" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "authorId" TEXT,

    CONSTRAINT "Qosidah_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_KeywordQosidahToQosidah" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "KeywordQosidah_keyword_key" ON "KeywordQosidah"("keyword");

-- CreateIndex
CREATE UNIQUE INDEX "_KeywordQosidahToQosidah_AB_unique" ON "_KeywordQosidahToQosidah"("A", "B");

-- CreateIndex
CREATE INDEX "_KeywordQosidahToQosidah_B_index" ON "_KeywordQosidahToQosidah"("B");

-- AddForeignKey
ALTER TABLE "Qosidah" ADD CONSTRAINT "Qosidah_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_KeywordQosidahToQosidah" ADD CONSTRAINT "_KeywordQosidahToQosidah_A_fkey" FOREIGN KEY ("A") REFERENCES "KeywordQosidah"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_KeywordQosidahToQosidah" ADD CONSTRAINT "_KeywordQosidahToQosidah_B_fkey" FOREIGN KEY ("B") REFERENCES "Qosidah"("id") ON DELETE CASCADE ON UPDATE CASCADE;
