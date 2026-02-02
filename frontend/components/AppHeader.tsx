import Link from "next/link";
import { cookies } from "next/headers";
import LogoutButton from "./LogoutButton";
import { getEmailFromJwt } from "@/lib/jwt";

export default async function AppHeader() {
    const cookieStore = await cookies();
    const token = cookieStore.get("sb-access-token")?.value;
    const email = token ? getEmailFromJwt(token) : null;

    // Si no hay sesión, no mostramos header (por ejemplo en /login)
    if (!email) return null;

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur">
        <div className="mx-auto max-w-6xl px-6 py-3 flex items-center justify-between gap-4">
            <Link href="/" className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl border bg-muted flex items-center justify-center font-semibold">
                A
            </div>
            <div className="leading-tight">
                <div className="font-semibold">Calvi S.A.S</div>
                <div className="text-xs text-muted-foreground">Software de informacion</div>
            </div>
            </Link>

            <div className="flex items-center gap-3">
            <div className="hidden sm:block text-right leading-tight">
                <div className="text-xs text-muted-foreground">Admin</div>
                <div className="text-sm font-medium">{email}</div>
            </div>
            <LogoutButton />
            </div>
        </div>
        </header>
    );
}





