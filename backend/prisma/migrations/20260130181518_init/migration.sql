-- CreateTable
CREATE TABLE "Campo" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "superficieTotalHa" DOUBLE PRECISION NOT NULL,
    "superficieCultivableHa" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Campo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lote" (
    "nroLote" TEXT NOT NULL,
    "areaHa" DOUBLE PRECISION NOT NULL,
    "observaciones" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "campoId" TEXT NOT NULL,

    CONSTRAINT "Lote_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Lote_campoId_idx" ON "Lote"("campoId");

-- CreateIndex
CREATE UNIQUE INDEX "Lote_campoId_nombre_key" ON "Lote"("campoId", "nombre");

-- AddForeignKey
ALTER TABLE "Lote" ADD CONSTRAINT "Lote_campoId_fkey" FOREIGN KEY ("campoId") REFERENCES "Campo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
