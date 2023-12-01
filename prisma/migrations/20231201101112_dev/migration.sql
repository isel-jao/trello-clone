-- CreateTable
CREATE TABLE "boards" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "image_id" TEXT NOT NULL,
    "image_thumb_url" TEXT NOT NULL,
    "image_full_url" TEXT NOT NULL,
    "image_user_name" TEXT NOT NULL,
    "image_link_html" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "boards_pkey" PRIMARY KEY ("id")
);
