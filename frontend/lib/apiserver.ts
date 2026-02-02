import { cookies } from "next/headers";

export async function apiFetch(path: string, init?: RequestInit) {
    const cookieStore = await cookies();
    const token = cookieStore.get("sb-access-token")?.value;

    const base = process.env.NEXT_PUBLIC_API_URL;

    if (!base) throw new Error("Falta NEXT_PUBLIC_API_URL en .env.local");
    if (!token) throw new Error("No hay sesión: falta cookie sb-access-token");

    return fetch(`${base}${path}`, {
        ...init,
        headers: {
        ...(init?.headers ?? {}),
        Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
    });
}
