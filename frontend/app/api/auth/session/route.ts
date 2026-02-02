import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const { access_token } = await req.json();

    if (!access_token) {
        return NextResponse.json({ ok: false, error: 'missing access_token' }, { status: 400 });
    }

    const res = NextResponse.json({ ok: true });

    res.cookies.set('sb-access-token', access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
    });

    return res;
    }

    export async function DELETE() {
    const res = NextResponse.json({ ok: true });
    res.cookies.set('sb-access-token', '', { path: '/', maxAge: 0 });
    return res;
}
