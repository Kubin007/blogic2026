"use client";

import { AppShell, Container, Group, Button, Text } from "@mantine/core";
import type { PropsWithChildren } from "react";
import { PageLogo } from "@/components/layout/PageLogo";
import Link from "next/link";

const HEADER_HEIGHT = 70;
const BODY_MAX_WIDTH = 1280;

export function PageLayout({ children }: PropsWithChildren) {
  return (
    <AppShell header={{ height: HEADER_HEIGHT }} padding="md" withBorder={false}>
      <AppShell.Header px="md" style={{ borderBottom: "1px solid #e9ecef", background: "#fff" }}>
        <Container size={BODY_MAX_WIDTH} h="100%">
          <Group h="100%" align="center" justify="space-between">
            <Link href="/cs" style={{ textDecoration: "none" }}>
              <PageLogo />
            </Link>
            <Group gap="xs">
              <Link href="/cs/inzeraty">
                <Button variant="subtle" color="gray">Inzeráty</Button>
              </Link>
              <Link href="/cs/inzeraty/novy">
                <Button color="orange">+ Přidat inzerát</Button>
              </Link>
            </Group>
          </Group>
        </Container>
      </AppShell.Header>

      <AppShell.Main style={{ background: "#f8f9fa" }}>
        <Container size={BODY_MAX_WIDTH} px="md">
          {children}
        </Container>
      </AppShell.Main>
    </AppShell>
  );
}