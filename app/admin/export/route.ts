import { getInquiries } from "@/src/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const cell = (v: unknown) => `"${String(v ?? "").replace(/"/g, '""')}"`;

/**
 * Downloads all stored inquiries as CSV. Protected by the same Basic-auth
 * middleware as the rest of /admin. UTF-8 BOM so Korean opens cleanly in Excel.
 */
export async function GET() {
  const rows = await getInquiries(1000);
  const cols: (keyof (typeof rows)[number])[] = [
    "id",
    "name",
    "email",
    "project_type",
    "message",
    "created_at",
  ];
  const lines = [
    cols.join(","),
    ...rows.map((r) => cols.map((c) => cell(r[c])).join(",")),
  ];
  const csv = "﻿" + lines.join("\r\n");

  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'attachment; filename="inquiries.csv"',
      "Cache-Control": "no-store",
    },
  });
}
