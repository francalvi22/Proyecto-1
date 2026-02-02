export function getEmailFromJwt(token: string): string | null {
    try {
        const parts = token.split(".");
        if (parts.length < 2) return null;

        const payload = parts[1];

        // base64url -> base64
        const b64 = payload.replace(/-/g, "+").replace(/_/g, "/");
        const padded = b64.padEnd(Math.ceil(b64.length / 4) * 4, "=");

        const json = Buffer.from(padded, "base64").toString("utf8");
        const data = JSON.parse(json);

        return typeof data.email === "string" ? data.email : null;
    } catch {
        return null;
    }
}
