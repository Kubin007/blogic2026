"use client";

import { TextInput } from "@mantine/core";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

export function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    const params = new URLSearchParams(searchParams.toString());
    if (e.target.value) {
      params.set("q", e.target.value);
    } else {
      params.delete("q");
    }
    router.push(`/cs/inzeraty?${params.toString()}`);
  }

  return (
    <TextInput
      mt="md"
      placeholder="Hledat inzeráty..."
      leftSection={<Search size={16} />}
      defaultValue={searchParams.get("q") ?? ""}
      onChange={handleSearch}
    />
  );
}
