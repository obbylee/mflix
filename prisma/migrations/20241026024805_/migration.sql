/*
  Warnings:

  - You are about to drop the `Movie` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Movie";

-- CreateTable
CREATE TABLE "director" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "director_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "actor" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "actor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "movie" (
    "id" TEXT NOT NULL,
    "director_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "plot" TEXT NOT NULL,
    "duration" TEXT NOT NULL,
    "release_date" TIMESTAMP(3) NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "movie_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MovieActors" (
    "movie_id" TEXT NOT NULL,
    "actor_id" TEXT NOT NULL,

    CONSTRAINT "MovieActors_pkey" PRIMARY KEY ("movie_id","actor_id")
);

-- AddForeignKey
ALTER TABLE "movie" ADD CONSTRAINT "movie_director_id_fkey" FOREIGN KEY ("director_id") REFERENCES "director"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovieActors" ADD CONSTRAINT "MovieActors_movie_id_fkey" FOREIGN KEY ("movie_id") REFERENCES "movie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovieActors" ADD CONSTRAINT "MovieActors_actor_id_fkey" FOREIGN KEY ("actor_id") REFERENCES "actor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
