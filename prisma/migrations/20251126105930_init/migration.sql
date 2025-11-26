-- CreateEnum
CREATE TYPE "VisitorStatus" AS ENUM ('INSIDE', 'EXITED');

-- CreateTable
CREATE TABLE "VisitorLog" (
    "id" TEXT NOT NULL,
    "visitorName" TEXT NOT NULL,
    "contactNumber" TEXT NOT NULL,
    "hostName" TEXT NOT NULL,
    "purpose" TEXT NOT NULL,
    "apartmentNo" TEXT NOT NULL,
    "floor" INTEGER NOT NULL,
    "photoUrl" TEXT NOT NULL,
    "checkInTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "checkOutTime" TIMESTAMP(3),
    "status" "VisitorStatus" NOT NULL DEFAULT 'INSIDE',

    CONSTRAINT "VisitorLog_pkey" PRIMARY KEY ("id")
);
