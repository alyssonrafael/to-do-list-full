/*
  Warnings:

  - You are about to drop the column `dia` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `horario` on the `Task` table. All the data in the column will be lost.
  - Added the required column `data` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Task" DROP COLUMN "dia",
DROP COLUMN "horario",
ADD COLUMN     "data" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "cor" SET DEFAULT 'red';
