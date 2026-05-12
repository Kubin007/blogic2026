import { SimpleGrid, Title } from "@mantine/core";
import { getTranslations } from "next-intl/server";
import { InzeratCard } from "@/components/InzeratCard";

const INZERATY = [
  { id: 1, nazev: "Stará pohovka", cena: 500, kategorie: "Nábytek" },
  { id: 2, nazev: "Dětský kočárek", cena: 0, kategorie: "Dětské věci" },
  { id: 3, nazev: "Knihy", cena: 50, kategorie: "Knihy" },
];

export default async function InzeratyPage() {
  const _t = await getTranslations();
  return (
    <>
      <Title>Přehled inzerátů</Title>
      <SimpleGrid cols={3} mt="md">
        {INZERATY.map((inzerat) => (
          <InzeratCard key={inzerat.id} inzerat={inzerat} />
        ))}
      </SimpleGrid>
    </>
  );
}
