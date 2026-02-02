"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { API_URL } from "@/lib/config";

type Lote = {
    id: string;
    nroLote: string;
    areaHa: number;
    observaciones: string | null;
    campoId: string;
    };

    export default function LotesEditor({ initialLotes }: { initialLotes: Lote[] }) {
    const [lotes, setLotes] = useState<Lote[]>(initialLotes);
    const [savingId, setSavingId] = useState<string | null>(null);

    function updateLocal(id: string, patch: Partial<Lote>) {
        setLotes((prev) => prev.map((l) => (l.id === id ? { ...l, ...patch } : l)));
    }

    async function guardarLote(lote: Lote) {
        setSavingId(lote.id);

        const res = await fetch(`${API_URL}/lotes/${lote.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            nroLote: lote.nroLote,
            areaHa: Number(lote.areaHa),
            observaciones: lote.observaciones,
        }),
        });

        setSavingId(null);

        if (!res.ok) {
        const txt = await res.text().catch(() => "");
        alert(`Error guardando lote: ${res.status} ${res.statusText}\n${txt}`);
        return;
        }

        const updated = await res.json();
        setLotes((prev) => prev.map((l) => (l.id === lote.id ? updated : l)));
    }

    return (
        <div className="px-6 pb-6 overflow-x-auto">
        <table className="w-full text-sm">
            <thead className="text-left border-b">
            <tr>
                <th className="py-2">Lote</th>
                <th className="py-2">Área (ha)</th>
                <th className="py-2">Observaciones</th>
                <th className="py-2 w-[140px]"></th>
            </tr>
            </thead>

            <tbody>
            {lotes.map((l) => (
                <tr key={l.id} className="border-b last:border-b-0">
                <td className="py-2 pr-2">
                    <Input
                    value={l.nroLote}
                    onChange={(e) => updateLocal(l.id, { nroLote: e.target.value })}
                    />
                </td>

                <td className="py-2 pr-2">
                    <Input
                    type="number"
                    step="0.1"
                    value={String(l.areaHa)}
                    onChange={(e) => updateLocal(l.id, { areaHa: Number(e.target.value) })}
                    />
                </td>

                <td className="py-2 pr-2">
                    <Input
                    value={l.observaciones ?? ""}
                    onChange={(e) =>
                        updateLocal(l.id, { observaciones: e.target.value || null })
                    }
                    />
                </td>

                <td className="py-2">
                    <Button onClick={() => guardarLote(l)} disabled={savingId === l.id}>
                    {savingId === l.id ? "Guardando..." : "Guardar"}
                    </Button>
                </td>
                </tr>
            ))}

            {lotes.length === 0 && (
                <tr>
                <td className="py-4 text-muted-foreground" colSpan={4}>
                    No hay lotes cargados para este campo.
                </td>
                </tr>
            )}
            </tbody>
        </table>
        </div>
    );
}

