/*
  Warnings:

  - The `autores` column on the `Livro` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Livro" DROP COLUMN "autores",
ADD COLUMN     "autores" JSONB;
