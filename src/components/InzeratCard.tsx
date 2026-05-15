"use client";

import { Badge, Button, Card, Group, Image, Text } from "@mantine/core";
import type { Inzerat } from "@/db/schemas/inzerat.schema";
import Link from "next/link";

export function InzeratCard({ inzerat }: { inzerat: Inzerat }) {
  const stavBarva = inzerat.stav === "Dostupné" ? "green" : inzerat.stav === "Rezervováno" ? "yellow" : "gray";

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder style={{ display: "flex", flexDirection: "column" }}>
      <Card.Section style={{ position: "relative", height: 180, overflow: "hidden", background: "#f8f9fa" }}>
        <Image
          src={inzerat.obrazek ?? undefined}
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
          alt={inzerat.nazev}
          fallbackSrc="https://placehold.co/400x180/f1f3f5/868e96?text=Bez+obrázku"
        />
        <Badge
          color={stavBarva}
          style={{ position: "absolute", top: 8, left: 8 }}
        >
          {inzerat.stav}
        </Badge>
      </Card.Section>
      <Group justify="space-between" mb="xs" mt="md">
        <Text fw={500} lineClamp={1}>
          {inzerat.nazev}
        </Text>
        <Badge color="orange">{inzerat.kategorie}</Badge>
      </Group>
      <Text size="sm" c="dimmed" lineClamp={1} style={{ flex: 1 }}>
        {inzerat.zdarma ? "Zdarma" : `${inzerat.cena} Kč`}
      </Text>
      <Link href={`/cs/inzeraty/${inzerat.id}`}>
        <Button color="orange" fullWidth mt="md">
          Detail
        </Button>
      </Link>
    </Card>
  );
}