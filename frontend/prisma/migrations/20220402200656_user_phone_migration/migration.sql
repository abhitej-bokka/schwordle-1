-- CreateTable
CREATE TABLE "Message" (
    "userPhone" TEXT NOT NULL,
    "messageString" TEXT NOT NULL,
    "wordleGame" TEXT NOT NULL,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("userPhone")
);

-- CreateTable
CREATE TABLE "User" (
    "userPhone" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,
    "name" TEXT,
    "groupCode" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userPhone")
);

-- CreateTable
CREATE TABLE "Group" (
    "code" TEXT NOT NULL,

    CONSTRAINT "Group_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "_prisma_new_User" (
    "userPhone" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT,
    "groupCode" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userPhone")
);

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_userPhone_fkey" FOREIGN KEY ("userPhone") REFERENCES "User"("userPhone") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_groupCode_fkey" FOREIGN KEY ("groupCode") REFERENCES "Group"("code") ON DELETE RESTRICT ON UPDATE CASCADE;
