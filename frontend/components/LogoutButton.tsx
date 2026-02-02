"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabaseclient";

export default function LogoutButton() {
    const router = useRouter();

    const onLogout = async () => {
        // 1) Limpia sesión supabase en el cliente (recomendado)
        await supabase.auth.signOut();

        // 2) Borra cookie httpOnly (esto es lo que realmente te “desloguea” del server)
        await fetch("/api/auth/session", { method: "DELETE" });

        router.push("/login");
        router.refresh();
    };

    return (
        <Button variant="outline" onClick={onLogout}>
        Salir
        </Button>
    );
}
