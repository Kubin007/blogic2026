"use client";

import { Button, Modal, Stack } from "@mantine/core";
import { useRef, useState } from "react";
import ReactCrop, { type Crop, centerCrop, makeAspectCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

type Props = {
  onCropDone: (base64: string, pozice: string) => void;
  existingImage?: string | null;
};

export function ImageCropper({ onCropDone, existingImage }: Props) {
  const [opened, setOpened] = useState(false);
  const [src, setSrc] = useState<string | null>(existingImage ?? null);
  const [crop, setCrop] = useState<Crop>();
  const imgRef = useRef<HTMLImageElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setSrc(reader.result as string);
      setOpened(true);
    };
    reader.readAsDataURL(file);
  }

  function handleImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    const { width, height } = e.currentTarget;
    const initialCrop = centerCrop(makeAspectCrop({ unit: "%", width: 90 }, 16 / 9, width, height), width, height);
    setCrop(initialCrop);
  }

  function handleCropDone() {
    if (!src || !crop) return;
    const poziceX = Math.round(crop.x + crop.width / 2);
    const poziceY = Math.round(crop.y + crop.height / 2);
    const pozice = `${poziceX}% ${poziceY}%`;
    onCropDone(src, pozice);
    setOpened(false);
  }

  return (
    <>
      <input ref={inputRef} type="file" accept="image/*" onChange={handleFile} style={{ display: "none" }} />

      {existingImage ? (
        <Stack gap="xs">
          <Button
            color="orange"
            variant="outline"
            onClick={() => {
              setSrc(existingImage);
              setOpened(true);
            }}
          >
            Upravit ořez
          </Button>
          <Button color="orange" variant="outline" onClick={() => inputRef.current?.click()}>
            Nahrát nový obrázek
          </Button>
        </Stack>
      ) : (
        <Button color="orange" variant="outline" onClick={() => inputRef.current?.click()}>
          Vybrat obrázek
        </Button>
      )}

      <Modal opened={opened} onClose={() => setOpened(false)} title="Ořízni obrázek" size="lg">
        <Stack>
          {src && (
            <ReactCrop crop={crop} onChange={(_, percentCrop) => setCrop(percentCrop)} aspect={16 / 9}>
              {/* biome-ignore lint/performance/noImgElement: ReactCrop vyžaduje img element */}
              <img ref={imgRef} src={src} onLoad={handleImageLoad} style={{ maxWidth: "100%" }} alt="crop" />
            </ReactCrop>
          )}
          <Button color="orange" onClick={handleCropDone}>
            Potvrdit ořez
          </Button>
        </Stack>
      </Modal>
    </>
  );
}