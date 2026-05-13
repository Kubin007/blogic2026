"use client";

import { Card, Text, Badge, Button, Group, Image } from "@mantine/core";
import Link from "next/link";
import type { Inzerat } from "@/db/schemas/inzerat.schema";

export function InzeratCard({ inzerat }: { inzerat: Inzerat }) {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder style={{ display: "flex", flexDirection: "column" }}>
      <Card.Section style={{ height: 120, overflow: "hidden", background: "#f1f3f5" }}>
        <Image
          src={inzerat.obrazek ?? undefined}
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
          alt={inzerat.nazev}
          fallbackSrc="https://placehold.co/400x120/f1f3f5/868e96?text=Bez+obrázku"
        />
      </Card.Section>
      <Group justify="space-between" mb="xs" mt="md">
        <Text fw={500} lineClamp={1}>{inzerat.nazev}</Text>
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