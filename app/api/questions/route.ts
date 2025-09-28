import { NextResponse } from "next/server";
import path from "path";
import { promises as fs } from "fs";

export async function GET() {
  const filePath = path.join(process.cwd(), "data", "questions.json");
  const fileData = await fs.readFile(filePath, "utf-8");
  const questions = JSON.parse(fileData);

  return NextResponse.json(questions);
}
