import { SimpleGrid, Title } from "@mantine/core";
import { InzeratCard } from "@/components/InzeratCard";
import { db } from "@/db";
import { inzerat } from "@/db/schemas/inzerat.schema";

export const dynamic = "force-dynamic";

export default async function InzeratyPage() {
  const inzeraty = await db.select().from(inzerat);

  return (
    <>
      <Title mt="md">Přehled inzerátů</Title>
      <SimpleGrid cols={3} mt="md">
        {inzeraty.map((i) => (
          <InzeratCard key={i.id} inzerat={i} />
        ))}
      </SimpleGrid>
    </>
  );
}
