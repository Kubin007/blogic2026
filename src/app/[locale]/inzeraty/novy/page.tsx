"use client";

import { Button, Card, Checkbox, NumberInput, Select, Stack, Textarea, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";

export default function NovyInzeratPage() {
  const form = useForm({
    initialValues: {
      nazev: "",
      popis: "",
      cena: 0,
      kategorie: "",
      stav: "Dostupné",
      kontakt: "",
      zdarma: false,
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
          <Button
            color="orange"
            onClick={() => {
              const result = form.validate();
              if (!result.hasErrors) {
                alert("Inzerát byl přidán!");
                form.reset();
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
