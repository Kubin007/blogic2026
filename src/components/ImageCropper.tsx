"use client";

import { Button, Image, Modal, Stack } from "@mantine/core";
import { useRef, useState } from "react";
import ReactCrop, { type Crop, centerCrop, makeAspectCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

type Props = {
  onCropDone: (base64: string) => void;
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
    const initialCrop = centerCrop(
      makeAspectCrop({ unit: "%", width: 90 }, 16 / 9, width, height),
      width,
      height,
    );
    setCrop(initialCrop);
  }

  function handleCropDone() {
    if (!imgRef.current || !crop) return;
    const canvas = document.createElement("canvas");
    const scaleX = imgRef.current.naturalWidth / imgRef.current.width;
    const scaleY = imgRef.current.naturalHeight / imgRef.current.height;
    canvas.width = (crop.width / 100) * imgRef.current.width * scaleX;
    canvas.height = (crop.height / 100) * imgRef.current.height * scaleY;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(
      imgRef.current,
      (crop.x / 100) * imgRef.current.width * scaleX,
      (crop.y / 100) * imgRef.current.height * scaleY,
      canvas.width,
      canvas.height,
      0,
      0,
      canvas.width,
      canvas.height,
    );
    const base64 = canvas.toDataURL("image/jpeg", 0.8);
    onCropDone(base64);
    setOpened(false);
  }

  return (
    <>
      <input ref={inputRef} type="file" accept="image/*" onChange={handleFile} style={{ display: "none" }} />

      {existingImage ? (
        <Stack gap="xs">
          <Image
            src={existingImage}
            alt="Náhled"
            radius="md"
            mah={200}
            fit="contain"
            style={{ cursor: "pointer" }}
            onClick={() => {
              setSrc(existingImage);
              setOpened(true);
            }}
          />
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