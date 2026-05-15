"use client";

import {
  Button,
  Card,
  Checkbox,
  Group,
  Modal,
  NumberInput,
  Select,
  Stack,
  Text,
  Textarea,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";
import Link from "next/link";
import { ImageCropper } from "@/components/ImageCropper";
import { smazatInzerat, upravitInzerat } from "./action";

type Props = {
  inzerat: {
    id: number;
    nazev: string;
    popis: string;
    cena: number;
    zdarma: boolean;
    kategorie: string;
    stav: string;
    kontakt: string;
    obrazek: string | null;
  };
};

export function UpravitForm({ inzerat }: Props) {
  const [obrazekUrl, setObrazekUrl] = useState<string | null>(inzerat.obrazek);
  const [smazatOpened, setSmazatOpened] = useState(false);

  const form = useForm({
    initialValues: {
      nazev: inzerat.nazev,
      popis: inzerat.popis,
      cena: inzerat.cena,
      kategorie: inzerat.kategorie,
      stav: inzerat.stav,
      kontakt: inzerat.kontakt,
      zdarma: inzerat.zdarma,
      obrazek: inzerat.obrazek ?? "",
    },
    validate: {
      nazev: (value) => (value.trim().length === 0 ? "Název je povinný" : null),
      popis: (value) => (value.trim().length === 0 ? "Popis je povinný" : null),
      kategorie: (value) => (value.trim().length === 0 ? "Kategorie je povinná" : null),
      kontakt: (value) => (value.trim().length === 0 ? "Kontakt je povinný" : null),
      cena: (value, values) => (!values.zdarma && value <= 0 ? "Zadej cenu nebo označ jako Zdarma" : null),
    },
  });

  return (
    <>
      <Modal
        opened={smazatOpened}
        onClose={() => setSmazatOpened(false)}
        title="Smazat inzerát"
        centered
      >
        <Text>Opravdu chceš smazat inzerát <b>{inzerat.nazev}</b>? Tato akce je nevratná.</Text>
        <Group mt="md" justify="flex-end">
          <Button variant="subtle" onClick={() => setSmazatOpened(false)}>Zrušit</Button>
          <Button color="red" onClick={async () => await smazatInzerat(inzerat.id)}>
            Smazat
          </Button>
        </Group>
      </Modal>

      <Group mt="md">
        <Link href={`/cs/inzeraty/${inzerat.id}`}>
          <Button variant="subtle" color="orange">
            ← Zpět na detail
          </Button>
        </Link>
        <Button color="red" variant="outline" onClick={() => setSmazatOpened(true)}>
          Smazat inzerát
        </Button>
      </Group>

      <Title mt="md">Upravit inzerát</Title>
      <Card withBorder radius="md" p="xl" mt="md" maw={600}>
        <Stack>
          <TextInput label="Název" placeholder="Co nabízíš?" {...form.getInputProps("nazev")} />
          <Textarea label="Popis" placeholder="Popiš stav věci..." minRows={3} {...form.getInputProps("popis")} />
          <Select
            label="Kategorie"
            placeholder="Vyber kategorii"
            data={["Nábytek", "Dětské věci", "Oblečení", "Elektronika", "Knihy", "Ostatní"]}
            {...form.getInputProps("kategorie")}
          />
          <Select
            label="Stav"
            data={["Dostupné", "Rezervováno", "Prodáno / předáno"]}
            {...form.getInputProps("stav")}
          />
          <Checkbox label="Zdarma" {...form.getInputProps("zdarma", { type: "checkbox" })} />
          {!form.values.zdarma && (
            <NumberInput label="Cena (Kč)" placeholder="0" min={0} {...form.getInputProps("cena")} />
          )}
          <TextInput label="Kontakt" placeholder="Tvůj e-mail nebo telefon" {...form.getInputProps("kontakt")} />
          <Stack gap={4}>
            <Text size="sm" fw={500}>
              Obrázek
            </Text>
            <ImageCropper
              existingImage={obrazekUrl}
              onCropDone={(base64) => {
                setObrazekUrl(base64);
                form.setFieldValue("obrazek", base64);
              }}
            />
          </Stack>
          <Button
            color="orange"
            onClick={async () => {
              const result = form.validate();
              if (!result.hasErrors) {
                await upravitInzerat(inzerat.id, form.values);
              }
            }}
          >
            Uložit změny
          </Button>
        </Stack>
      </Card>
    </>
  );
}