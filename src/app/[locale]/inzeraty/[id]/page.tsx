import { Badge, Button, Text, Title } from "@mantine/core";
import Link from "next/link";

const INZERATY = [
  { id: 1, nazev: "Stará pohovka", cena: 500, kategorie: "Nábytek", popis: "Dobrý stav, jen trochu ošoupaná." },
  { id: 2, nazev: "Dětský kočárek", cena: 0, kategorie: "Dětské věci", popis: "Funkční, darujeme zdarma." },
  { id: 3, nazev: "Knihy", cena: 50, kategorie: "Knihy", popis: "Mix různých žánrů." },
];

export default async function DetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const inzerat = INZERATY.find((i) => i.id === Number(id));

  if (!inzerat) return <Text>Inzerát nenalezen.</Text>;

  return (
    <>
      <Title>{inzerat.nazev}</Title>
      <Badge mt="sm" color="orange">
        {inzerat.kategorie}
      </Badge>
      <Text mt="md">{inzerat.popis}</Text>
      <Text mt="sm" fw={500}>
        {inzerat.cena === 0 ? "Zdarma" : `${inzerat.cena} Kč`}
      </Text>
      <Link href="/cs/inzeraty">
        <Button mt="lg" color="orange">
          Zpět na přehled
        </Button>
      </Link>
    </>
  );
}
