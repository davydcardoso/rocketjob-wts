-- CreateTable
CREATE TABLE "contacts" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "push_name" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "is_business" BOOLEAN DEFAULT false,
    "is_enterprise" BOOLEAN DEFAULT false,
    "is_me" BOOLEAN NOT NULL DEFAULT false,
    "is_user" BOOLEAN DEFAULT true,
    "is_group" BOOLEAN DEFAULT false,
    "is_wa_contact" BOOLEAN DEFAULT false,
    "is_my_contact" BOOLEAN DEFAULT false,
    "is_blocked" BOOLEAN DEFAULT true,
    "server" TEXT,
    "serialized" TEXT,

    CONSTRAINT "contacts_pkey" PRIMARY KEY ("id")
);
