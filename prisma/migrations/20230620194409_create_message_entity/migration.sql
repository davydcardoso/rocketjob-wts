-- CreateTable
CREATE TABLE "messages" (
    "id" TEXT NOT NULL,
    "contact_id" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "is_media" BOOLEAN DEFAULT false,
    "myme_type" TEXT,
    "reeceived_in" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "messages_pkey" PRIMARY KEY ("id")
);
