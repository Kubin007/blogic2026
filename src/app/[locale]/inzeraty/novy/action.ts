"use server";

import { db } from "@/db";
import { inzerat } from "@/db/schemas/inzerat.schema";
import { redirect } from "next/navigation";

export async function vytvorInzerat(data: {
  nazev: string;
  popis: string;
  cena: number;
  zdarma: boolean;
  kategorie: string;
  stav: string;
  kontakt: string;
  obrazek: string;
  obrazekPozice: string;
}) {
  await db.insert(inzerat).values({
    ...data,
    obrazek: data.obrazek || null,
    obrazekPozice: data.obrazekPozice || "50% 50%",
  });
  redirect("/cs/inzeraty");
}