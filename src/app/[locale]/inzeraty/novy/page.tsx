"use client";

import {
  Button,
  Card,
  Checkbox,
  Image,
  NumberInput,
  Select,
  Stack,
  Text,
  Textarea,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { ImageCropper } from "@/components/ImageCropper";
import { vytvorInzerat } from "./action";
import { useState } from "react";

export default function NovyInzeratPage() {
  const [obrazekUrl, setObrazekUrl] = useState<string | null>(null);

  const form = useForm({
    initialValues: {
      nazev: "",
      popis: "",
      cena: 0,
      kategorie: "",
      stav: "Dostupné",
      kontakt: "",
      zdarma: false,
      obrazek: "",
      obrazekPozice: "50% 50%",
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
      <Title mt="md">Nový inzerát</Title>
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
              onCropDone={(base64, pozice) => {
                setObrazekUrl(base64);
                form.setFieldValue("obrazek", base64);
                form.setFieldValue("obrazekPozice", pozice);
              }}
            />
            {obrazekUrl && <Image src={obrazekUrl} alt="Náhled" radius="md" mt="xs" mah={200} fit="contain" />}
          </Stack>
          <Button
            color="orange"
            onClick={async () => {
              const result = form.validate();
              if (!result.hasErrors) {
                await vytvorInzerat(form.values);
              }
            }}
          >
            Přidat inzerát
          </Button>
        </Stack>
      </Card>
    </>
  );
}