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
}) {
  await db.insert(inzerat).values({
    ...data,
    obrazek: data.obrazek || null,
  });
  redirect("/cs/inzeraty");
}