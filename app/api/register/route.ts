import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const filePath = path.join(process.cwd(), "data", "participants.json");

    // Ensure directory exists
    await fs.mkdir(path.dirname(filePath), { recursive: true });

    let participants = [];
    try {
      const fileData = await fs.readFile(filePath, "utf-8");
      participants = JSON.parse(fileData);
    } catch (e) {
      // File doesn't exist yet or invalid JSON, start with empty array
    }

    // Create new participant with generated email and password
    const normalizedName = data.name.trim().toLowerCase().replace(/\s+/g, ".");
    const generatedEmail = `${normalizedName}@cat.go.id`;
    const generatedPassword = Math.random().toString(36).slice(-8); // Random 8 chars

    const newParticipant = {
      ...data,
      username: normalizedName,
      email: generatedEmail,
      password: generatedPassword,
      id: data.id || `PST-${Date.now()}`,
    };

    participants.push(newParticipant);

    await fs.writeFile(filePath, JSON.stringify(participants, null, 2));

    return NextResponse.json({
      success: true,
      message: `Pendaftaran berhasil! Simpan kredensial ini untuk login - Email: ${generatedEmail}, Password: ${generatedPassword}`,
    });
  } catch (error) {
    console.error("Error saving participant:", error);
    return NextResponse.json(
      { success: false, error: "Gagal menyimpan data" },
      { status: 500 },
    );
  }
}
