import { Badge, Button, Card, Divider, Group, Image, Stack, Text, Title } from "@mantine/core";
import { eq } from "drizzle-orm";
import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/db";
import { inzerat } from "@/db/schemas/inzerat.schema";

export const dynamic = "force-dynamic";

export default async function DetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [item] = await db
    .select()
    .from(inzerat)
    .where(eq(inzerat.id, Number(id)));

  if (!item) return notFound();

  return (
    <Stack align="center">
      <Group mt="md" w="100%" maw={700}>
        <Link href="/cs/inzeraty">
          <Button variant="subtle" color="orange">
            ← Zpět na přehled
          </Button>
        </Link>
        <Link href={`/cs/inzeraty/${item.id}/upravit`}>
          <Button color="orange">Upravit inzerát</Button>
        </Link>
      </Group>
      <Card withBorder radius="md" p="xl" w="100%" maw={700}>
        {item.obrazek && <Image src={item.obrazek} radius="md" mb="md" mah={400} fit="contain" />}
        <Group justify="space-between" mb="xs">
          <Title order={2}>{item.nazev}</Title>
          <Badge color="orange" size="lg">
            {item.kategorie}
          </Badge>
        </Group>
        <Badge color={item.stav === "Dostupné" ? "green" : item.stav === "Rezervováno" ? "yellow" : "gray"} mb="md">
          {item.stav}
        </Badge>
        <Divider mb="md" />
        <Text size="sm" mb="md" style={{ whiteSpace: "pre-wrap" }}>
          {item.popis}
        </Text>
        <Divider mb="md" />
        <Text fw={600} size="lg" mb="xs">
          {item.zdarma ? "Zdarma" : `${item.cena} Kč`}
        </Text>
        <Text size="sm" c="dimmed">
          Kontakt: {item.kontakt}
        </Text>
      </Card>
    </Stack>
  );
}
