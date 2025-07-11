/*
  Warnings:

  - The `autores` column on the `Livro` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Livro" DROP COLUMN "autores",
ADD COLUMN     "autores" TEXT[] DEFAULT ARRAY[]::TEXT[];

-- CreateTable
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UsuarioLivro" (
    "id" SERIAL NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "livroId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UsuarioLivro_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UsuarioLivro_usuarioId_livroId_key" ON "UsuarioLivro"("usuarioId", "livroId");

-- AddForeignKey
ALTER TABLE "UsuarioLivro" ADD CONSTRAINT "UsuarioLivro_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsuarioLivro" ADD CONSTRAINT "UsuarioLivro_livroId_fkey" FOREIGN KEY ("livroId") REFERENCES "Livro"("id") ON DELETE CASCADE ON UPDATE CASCADE;
