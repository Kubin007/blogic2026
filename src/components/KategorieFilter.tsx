"use client";

import { Badge, Group, ScrollArea } from "@mantine/core";
import { useRouter } from "next/navigation";

const KATEGORIE = ["Nábytek", "Dětské věci", "Oblečení", "Elektronika", "Knihy", "Ostatní"];

type Props = {
  aktivni: string | null;
};

export function KategorieFilter({ aktivni }: Props) {
  const router = useRouter();

  return (
    <ScrollArea mt="md">
      <Group gap="xs" wrap="nowrap">
        <Badge
          size="lg"
          radius="xl"
          style={{ cursor: "pointer" }}
          color={aktivni === null ? "orange" : "gray"}
          variant={aktivni === null ? "filled" : "outline"}
          onClick={() => router.push("/cs/inzeraty")}
        >
          Vše
        </Badge>
        {KATEGORIE.map((kat) => (
          <Badge
            key={kat}
            size="lg"
            radius="xl"
            style={{ cursor: "pointer" }}
            color={aktivni === kat ? "orange" : "gray"}
            variant={aktivni === kat ? "filled" : "outline"}
            onClick={() => router.push(`/cs/inzeraty?kategorie=${encodeURIComponent(kat)}`)}
          >
            {kat}
          </Badge>
        ))}
      </Group>
    </ScrollArea>
  );
}
