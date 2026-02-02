import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import LotesEditor from "./LotesEditor3";
import { apiFetch } from "@/lib/apiserver";

type Campo = {
  id: string;
  nombre: string;
  superficieTotalHa: number;
  superficieCultivableHa: number | null;
};

type Lote = {
  id: string;
  nroLote: string;
  areaHa: number;
  observaciones: string | null;
  campoId: string;
};

// ✅ CAMBIO: ahora usa apiFetch
async function getCampo(id: string): Promise<Campo> {
  const res = await apiFetch(`/campos/${id}`);
  if (!res.ok) throw new Error("No se pudo cargar el campo");
  return res.json();
}

// ✅ CAMBIO: ahora usa apiFetch
async function getLotes(id: string): Promise<Lote[]> {
  const res = await apiFetch(`/campos/${id}/lotes`);
  if (!res.ok) throw new Error("No se pudieron cargar los lotes");
  return res.json();
}

export default async function CampoPage({
  params,
}: {
  params: Promise<{ id: string }> | { id: string };
}) {
  const resolvedParams = params instanceof Promise ? await params : params;
  const campoId = resolvedParams.id;

  const [campo, lotes] = await Promise.all([getCampo(campoId), getLotes(campoId)]);

  const totalHa = lotes.reduce((acc, l) => acc + l.areaHa, 0);

  return (
    <main className="min-h-screen p-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">{campo.nombre}</h1>
          <p className="text-sm text-muted-foreground">
            Superficie total: {campo.superficieTotalHa} ha · Lotes: {lotes.length} · Área lotes:{" "}
            {totalHa.toFixed(1)} ha
          </p>
        </div>

        <Link href="/">
          <Button variant="outline">Volver</Button>
        </Link>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Lotes</CardTitle>
          <CardDescription>Lista de lotes del campo seleccionado.</CardDescription>
        </CardHeader>

        <LotesEditor initialLotes={lotes} />
      </Card>
    </main>
  );
}


