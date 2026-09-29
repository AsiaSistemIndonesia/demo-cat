import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    const filePath = path.join(process.cwd(), 'data', 'participants.json');
    
    let participants = [];
    try {
      const fileData = await fs.readFile(filePath, 'utf-8');
      participants = JSON.parse(fileData);
    } catch (e) {
      return NextResponse.json({ success: false, error: 'Data tidak ditemukan' }, { status: 404 });
    }
    
    const user = participants.find((p: any) => p.email === email && p.password === password);
    
    if (user) {
      const response = NextResponse.json({ success: true, message: "Login berhasil", user });
      response.cookies.set("userId", user.id, { path: '/' });
      return response;
    } else {
      return NextResponse.json({ success: false, error: 'Email atau password salah!' }, { status: 401 });
    }
  } catch (error) {
    console.error("Error during login:", error);
    return NextResponse.json({ success: false, error: 'Terjadi kesalahan server' }, { status: 500 });
  }
}
