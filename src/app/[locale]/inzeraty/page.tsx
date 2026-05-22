import { SimpleGrid, Title } from "@mantine/core";
import { InzeratCard } from "@/components/InzeratCard";
import { KategorieFilter } from "@/components/KategorieFilter";
import { SearchBar } from "@/components/SearchBar";
import { db } from "@/db";
import { inzerat } from "@/db/schemas/inzerat.schema";

export const dynamic = "force-dynamic";

export default async function InzeratyPage({
  searchParams,
}: {
  searchParams: Promise<{ kategorie?: string; q?: string }>;
}) {
  const { kategorie, q } = await searchParams;
  const vsechnyInzeraty = await db.select().from(inzerat);

  const filtrovane = vsechnyInzeraty
    .filter((i) => (kategorie ? i.kategorie === kategorie : true))
    .filter((i) =>
      q ? i.nazev.toLowerCase().includes(q.toLowerCase()) || i.popis.toLowerCase().includes(q.toLowerCase()) : true,
    );

  return (
    <>
      <Title mt="md">Přehled inzerátů</Title>
      <SearchBar />
      <KategorieFilter aktivni={kategorie ?? null} />
      <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} mt="md">
        {filtrovane.map((i) => (
          <InzeratCard key={i.id} inzerat={i} />
        ))}
      </SimpleGrid>
    </>
  );
}
