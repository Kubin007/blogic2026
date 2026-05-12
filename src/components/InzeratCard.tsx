"use client";

import { Card, Text, Badge, Button, Group } from "@mantine/core";
import Link from "next/link";

type Inzerat = {
  id: number;
  nazev: string;
  cena: number;
  kategorie: string;
};

export function InzeratCard({ inzerat }: { inzerat: Inzerat }) {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Group justify="space-between" mb="xs">
        <Text fw={500}>{inzerat.nazev}</Text>
        <Badge color="orange">{inzerat.kategorie}</Badge>
      </Group>
      <Text size="sm" c="dimmed">
        {inzerat.cena === 0 ? "Zdarma" : `${inzerat.cena} Kč`}
      </Text>
      <Link href={`/cs/inzeraty/${inzerat.id}`}>
        <Button color="orange" fullWidth mt="md">
          Detail
        </Button>
      </Link>
    </Card>
  );
}