import { Title, Text, Badge, Button, Group, Card, Divider, Image } from "@mantine/core";
import { db } from "@/db";
import { inzerat } from "@/db/schemas/inzerat.schema";
import { eq } from "drizzle-orm";
import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function DetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [item] = await db.select().from(inzerat).where(eq(inzerat.id, Number(id)));

  if (!item) return notFound();

  return (
    <>
      <Link href="/cs/inzeraty">
        <Button variant="subtle" color="orange" mt="md">
          ← Zpět na přehled
        </Button>
      </Link>
      <Card withBorder radius="md" p="xl" mt="md" maw={700}>
        {item.obrazek && (
          <Image src={item.obrazek} radius="md" mb="md" mah={400} fit="contain" />
        )}
        <Group justify="space-between" mb="xs">
          <Title order={2}>{item.nazev}</Title>
          <Badge color="orange" size="lg">{item.kategorie}</Badge>
        </Group>
        <Badge color={item.stav === "Dostupné" ? "green" : item.stav === "Rezervováno" ? "yellow" : "gray"} mb="md">
          {item.stav}
        </Badge>
        <Divider mb="md" />
        <Text mb="md">{item.popis}</Text>
        <Divider mb="md" />
        <Text fw={600} size="lg" mb="xs">
          {item.zdarma ? "Zdarma" : `${item.cena} Kč`}
        </Text>
        <Text size="sm" c="dimmed">Kontakt: {item.kontakt}</Text>
      </Card>
    </>
  );
}