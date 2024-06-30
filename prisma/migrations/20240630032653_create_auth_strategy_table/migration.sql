-- CreateTable
CREATE TABLE "AuthStrategy" (
    "strategy" TEXT NOT NULL,
    "id" TEXT NOT NULL,
    "secret" TEXT,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "AuthStrategy_pkey" PRIMARY KEY ("strategy","id")
);

-- AddForeignKey
ALTER TABLE "AuthStrategy" ADD CONSTRAINT "AuthStrategy_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
