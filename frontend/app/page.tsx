import Link from "next/link";
import { Card } from "../components/ui/card";
import { apiFetch } from "../lib/apiserver";

type Campo = {
  id: string;
  nombre: string;
  superficieTotalHa: number;
  superficieCultivableHa: number | null;
};

async function getCampos(): Promise<Campo[]> {
  const res = await apiFetch("/campos");
  if (!res.ok) throw new Error("No se pudieron cargar los campos");
  return res.json();
}

// Imágenes de ejemplo (podés cambiarlas cuando quieras)
const campoImages: Record<string, string> = {
  Ibipora:
    "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1600",
  "Tres Marias":
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600",
};

export default async function HomePage() {
  const campos = await getCampos();

  return (
    <main className="mx-auto max-w-6xl px-6 pt-20 pb-12">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-2xl font-semibold tracking-tight">Campos</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Click para ver información.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {campos.map((c) => (
          <Link key={c.id} href={`/campo/${c.id}`} className="group">
            <Card
              className="
                relative
                h-72
                overflow-hidden
                cursor-pointer
                transition-all
                hover:-translate-y-1
                hover:shadow-xl
              "
            >
              {/* Imagen */}
              <img
                src={campoImages[c.nombre] ?? campoImages.Ibipora}
                alt={`Campo ${c.nombre}`}
                className="absolute inset-0 h-full w-full object-cover"
              />

              {/* Overlay gradiente */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10 transition group-hover:from-black/80" />

              {/* Contenido sobre imagen */}
              <div className="relative z-10 flex h-full flex-col justify-end p-6">
                <h2 className="text-2xl font-semibold text-white">
                  {c.nombre}
                </h2>
                <div className="mt-1 text-sm text-white/80">
                  Entrar al campo
                </div>

                {/* CTA */}
                <div className="mt-4 inline-flex w-fit items-center gap-2 rounded-md bg-white/90 px-3 py-1.5 text-sm font-medium text-black transition group-hover:bg-white">
                  Entrar <span>→</span>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </main>
  );
}



