"use server";

import { db } from "@/db";
import { inzerat } from "@/db/schemas/inzerat.schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

export async function upravitInzerat(
  id: number,
  data: {
    nazev: string;
    popis: string;
    cena: number;
    zdarma: boolean;
    kategorie: string;
    stav: string;
    kontakt: string;
    obrazek: string;
    obrazekPozice: string;
  },
) {
  await db
    .update(inzerat)
    .set({ ...data, obrazek: data.obrazek || null, obrazekPozice: data.obrazekPozice || "50% 50%" })
    .where(eq(inzerat.id, id));
  redirect(`/cs/inzeraty/${id}`);
}

export async function smazatInzerat(id: number) {
  await db.delete(inzerat).where(eq(inzerat.id, id));
  redirect("/cs/inzeraty");
}