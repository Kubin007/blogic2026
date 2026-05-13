import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const inzerat = sqliteTable("inzerat", {
  id: integer().primaryKey({ autoIncrement: true }),
  nazev: text().notNull(),
  popis: text().notNull(),
  cena: integer().notNull().default(0),
  zdarma: integer({ mode: "boolean" }).notNull().default(false),
  kategorie: text().notNull(),
  stav: text().notNull().default("Dostupné"),
  kontakt: text().notNull(),
  obrazek: text(),
});

export type Inzerat = typeof inzerat.$inferSelect;
export type NewInzerat = typeof inzerat.$inferInsert;