/*
  Warnings:

  - The primary key for the `UsuarioLivro` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `UsuarioLivro` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "UsuarioLivro" DROP CONSTRAINT "UsuarioLivro_livroId_fkey";

-- DropForeignKey
ALTER TABLE "UsuarioLivro" DROP CONSTRAINT "UsuarioLivro_usuarioId_fkey";

-- DropIndex
DROP INDEX "UsuarioLivro_usuarioId_livroId_key";

-- AlterTable
ALTER TABLE "UsuarioLivro" DROP CONSTRAINT "UsuarioLivro_pkey",
DROP COLUMN "id",
ADD COLUMN     "paginasCustom" INTEGER,
ADD COLUMN     "tituloCustom" TEXT,
ADD CONSTRAINT "UsuarioLivro_pkey" PRIMARY KEY ("usuarioId", "livroId");

-- AddForeignKey
ALTER TABLE "UsuarioLivro" ADD CONSTRAINT "UsuarioLivro_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsuarioLivro" ADD CONSTRAINT "UsuarioLivro_livroId_fkey" FOREIGN KEY ("livroId") REFERENCES "Livro"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
