import { Title, Text, Button, Stack, Group, SimpleGrid, Card, Badge } from "@mantine/core";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { ShoppingBag, Search, Handshake, Sofa, Baby, Shirt, Smartphone, BookOpen, Package } from "lucide-react";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();
  return {
    title: t("page.home.title"),
    description: t("page.home.description"),
  };
}

export default async function Page(_: PageProps<"/[locale]">) {
  return (
    <>
      <Stack
        align="center"
        py={80}
        style={{
          borderRadius: "16px",
          background: "linear-gradient(135deg, #e8590c 0%, #d9480f 100%)",
          marginTop: "24px",
        }}
      >
        <Badge color="white" c="orange" size="lg" radius="xl">
          Interní bazar Blogic
        </Badge>
        <Title order={1} size="2.8rem" ta="center" c="white">
          Najdi. Nabídni. Předej dál.
        </Title>
        <Text size="lg" ta="center" maw={520} c="white" opacity={0.9}>
          Místo kde si spolupracovníci mohou nabízet věci, které nepotřebují — nábytek, elektroniku, oblečení a další.
        </Text>
        <Group mt="md">
          <Link href="/cs/inzeraty">
            <Button size="lg" radius="md" color="white" c="orange">
              Zobrazit inzeráty
            </Button>
          </Link>
          <Link href="/cs/inzeraty/novy">
            <Button size="lg" radius="md" variant="outline" color="white" c="white">
              Přidat inzerát
            </Button>
          </Link>
        </Group>
      </Stack>

      <Stack align="center" mt={60} mb={16}>
        <Title order={2}>Jak to funguje?</Title>
        <Text c="dimmed" ta="center">Jednoduché a rychlé sdílení věcí mezi kolegy</Text>
      </Stack>

      <SimpleGrid cols={3} spacing="lg" mb={60}>
        <Card withBorder radius="md" p="xl">
          <ShoppingBag size={32} color="#e8590c" />
          <Text fw={600} size="lg" mt="sm">Vytvoř inzerát</Text>
          <Text size="sm" c="dimmed" mt="xs">
            Vyplň název, popis, kategorii a cenu. Zabere to jen minutu.
          </Text>
        </Card>
        <Card withBorder radius="md" p="xl">
          <Search size={32} color="#e8590c" />
          <Text fw={600} size="lg" mt="sm">Prohlédni nabídky</Text>
          <Text size="sm" c="dimmed" mt="xs">
            Procházej inzeráty od kolegů a najdi co potřebuješ.
          </Text>
        </Card>
        <Card withBorder radius="md" p="xl">
          <Handshake size={32} color="#e8590c" />
          <Text fw={600} size="lg" mt="sm">Domluv předání</Text>
          <Text size="sm" c="dimmed" mt="xs">
            Kontaktuj prodávajícího a domluvte se na předání přímo v kanceláři.
          </Text>
        </Card>
      </SimpleGrid>

      <Stack align="center" mb={16}>
        <Title order={2}>Kategorie</Title>
        <Text c="dimmed">Co u nás najdeš?</Text>
      </Stack>

      <SimpleGrid cols={6} spacing="md" mb={80}>
        {[
          { icon: <Sofa size={28} color="#e8590c" />, label: "Nábytek" },
          { icon: <Baby size={28} color="#e8590c" />, label: "Dětské věci" },
          { icon: <Shirt size={28} color="#e8590c" />, label: "Oblečení" },
          { icon: <Smartphone size={28} color="#e8590c" />, label: "Elektronika" },
          { icon: <BookOpen size={28} color="#e8590c" />, label: "Knihy" },
          { icon: <Package size={28} color="#e8590c" />, label: "Ostatní" },
        ].map((kat) => (
          <Card key={kat.label} withBorder radius="md" p="md" style={{ textAlign: "center" }}>
            <Group justify="center">{kat.icon}</Group>
            <Text size="sm" fw={500} mt="xs">{kat.label}</Text>
          </Card>
        ))}
      </SimpleGrid>
    </>
  );
}