-- CreateTable
CREATE TABLE "Movie" (
    "movie_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "plot" TEXT NOT NULL,
    "duration" TEXT NOT NULL,
    "release_date" TIMESTAMP(3) NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Movie_pkey" PRIMARY KEY ("movie_id")
);
