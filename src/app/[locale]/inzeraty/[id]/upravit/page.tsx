import { db } from "@/db";
import { inzerat } from "@/db/schemas/inzerat.schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { UpravitForm } from "./UpravitForm";

export const dynamic = "force-dynamic";

export default async function UpravitPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [item] = await db.select().from(inzerat).where(eq(inzerat.id, Number(id)));

  if (!item) return notFound();

  return <UpravitForm inzerat={item} />;
}