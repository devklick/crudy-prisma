-- CreateTable
CREATE TABLE "user_session" (
    "id" SERIAL NOT NULL,
    "session_token" CHAR(128) NOT NULL,
    "created_on" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_on" TIMESTAMP(3) NOT NULL,
    "expires_on" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_session_pkey" PRIMARY KEY ("id")
);
