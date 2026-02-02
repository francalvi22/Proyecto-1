import Link from "next/link";
import { API_URL } from "../lib/config";
import { Card, CardHeader, CardTitle, CardDescription } from "../components/ui/card";

type Campo = {
  id: string;
  nombre: string;
  superficieTotalHa: number;
  superficieCultivableHa: number | null;
};

async function getCampos(): Promise<Campo[]> {
  const res = await fetch(`${API_URL}/campos`, { cache: "no-store" });
  if (!res.ok) throw new Error("No se pudieron cargar los campos");
  return res.json();
}

export default async function HomePage() {
  const campos = await getCampos();

  return (
    <main className="min-h-screen p-6">
      <h1 className="text-2xl font-semibold">Seleccioná un campo</h1>
      <p className="text-sm text-muted-foreground mt-1">
        Proyecto familiar: elegí uno de los dos campos para ver sus lotes.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
        {campos.map((c) => (
          <Link key={c.id} href={`/campo/${c.id}`}>
            <Card className="cursor-pointer hover:shadow-md transition">
              <CardHeader>
                <CardTitle>{c.nombre}</CardTitle>
                <CardDescription>
                  Superficie total: {c.superficieTotalHa} ha
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </main>
  );
}

