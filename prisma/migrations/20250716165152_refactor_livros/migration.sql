/*
  Warnings:

  - You are about to drop the `UsuarioLivro` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[usuarioId,isbn]` on the table `Livro` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `usuarioId` to the `Livro` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "UsuarioLivro" DROP CONSTRAINT "UsuarioLivro_livroId_fkey";

-- DropForeignKey
ALTER TABLE "UsuarioLivro" DROP CONSTRAINT "UsuarioLivro_usuarioId_fkey";

-- DropIndex
DROP INDEX "Livro_isbn_key";

-- AlterTable
ALTER TABLE "Livro" ADD COLUMN     "usuarioId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "UsuarioLivro";

-- CreateIndex
CREATE UNIQUE INDEX "Livro_usuarioId_isbn_key" ON "Livro"("usuarioId", "isbn");

-- AddForeignKey
ALTER TABLE "Livro" ADD CONSTRAINT "Livro_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
