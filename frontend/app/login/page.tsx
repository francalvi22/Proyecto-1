"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseclient";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState<string | null>(null);

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setErr(null);

        try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) throw error;

        const accessToken = data.session?.access_token;
        if (!accessToken) throw new Error("No se pudo obtener access_token");

        const r = await fetch("/api/auth/session", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ access_token: accessToken }),
        });

        if (!r.ok) {
            const j = await r.json().catch(() => null);
            throw new Error(j?.error ?? "No se pudo guardar la sesión");
        }

        router.push("/");
        router.refresh();
        } catch (e: any) {
        setErr(e?.message ?? "Error de login");
        } finally {
        setLoading(false);
        }
    };

    return (
        <div className="min-h-screen grid place-items-center px-6">
        {/* Fondo suave */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-muted/40 to-background" />

        <div className="w-full max-w-md">
            <Card className="shadow-lg">
            <CardHeader className="space-y-2">
                <CardTitle className="text-2xl font-semibold tracking-tight">
                CALVI SAS
                </CardTitle>
                <CardDescription className="text-sm">
                Acceso interno.
                </CardDescription>
            </CardHeader>

            <form onSubmit={onSubmit} className="px-6 pb-6 space-y-4">
                <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <input
                    className="w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-foreground/20"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="tuemail@gmail.com"
                    autoComplete="email"
                    required
                />
                </div>

                <div className="space-y-2">
                <label className="text-sm font-medium">Contraseña</label>
                <input
                    className="w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-foreground/20"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    placeholder="••••••••"
                    autoComplete="current-password"
                    required
                />
                </div>

                {err && (
                <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                    {err}
                </div>
                )}

                <Button className="w-full" disabled={loading} type="submit">
                {loading ? "Entrando..." : "Entrar"}
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                Informacion privada, no autorizada.
                </p>
            </form>
            </Card>
        </div>
        </div>
    );
}

