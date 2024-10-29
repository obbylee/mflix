/*
  Warnings:

  - You are about to drop the `MovieActors` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "MovieActors" DROP CONSTRAINT "MovieActors_actor_id_fkey";

-- DropForeignKey
ALTER TABLE "MovieActors" DROP CONSTRAINT "MovieActors_movie_id_fkey";

-- DropTable
DROP TABLE "MovieActors";

-- CreateTable
CREATE TABLE "movie_actor" (
    "movie_id" TEXT NOT NULL,
    "actor_id" TEXT NOT NULL,

    CONSTRAINT "movie_actor_pkey" PRIMARY KEY ("movie_id","actor_id")
);

-- AddForeignKey
ALTER TABLE "movie_actor" ADD CONSTRAINT "movie_actor_movie_id_fkey" FOREIGN KEY ("movie_id") REFERENCES "movie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "movie_actor" ADD CONSTRAINT "movie_actor_actor_id_fkey" FOREIGN KEY ("actor_id") REFERENCES "actor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
