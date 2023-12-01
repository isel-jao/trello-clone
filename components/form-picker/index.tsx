import React, { useState, useEffect, useId } from "react";
import unsplash from "@/lib/unsplash";
import useSWR from "swr";
import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";
import Image from "next/image";
import { cn } from "@/lib/utils";

import { defaultImages } from "@/constants/images";
import Link from "next/link";

export interface FromPickerProps
  extends Omit<
    React.HTMLAttributes<HTMLInputElement>,
    "type" | "checked" | "value"
  > {
  name: string;
  errors?: Record<string, string[] | undefined>;
}

const fetcher = async () => {
  const result = await unsplash.photos.getRandom({
    collectionIds: ["317099"],
    count: 9,
  });
  console.log({ result });
  return result.response as Array<Record<string, any>>;
};

export function FormPicker({
  className,
  name,
  errors,
  ...props
}: FromPickerProps) {
  const { pending } = useFormStatus();
  const [selectedImageId, setSelectedImageId] = useState<string | null>(null);
  const { data, isLoading, error } = useSWR("unsplash", fetcher);

  const images = !error && data ? data : defaultImages;

  if (isLoading)
    return (
      <div className="flex items-center justify-center p-6">
        <Loader2 className="aspect-square h-6 animate-spin text-sky-600" />
      </div>
    );
  return (
    <div className={cn("space-y-2", className)}>
      <span className="text-xs font-medium text-neutral-600">Cover image</span>

      <div className="relative grid grid-cols-3 gap-2">
        {images.map((image, index) => (
          <div
            key={index}
            className={cn(
              "group relative aspect-video cursor-pointer rounded-md bg-muted transition-opacity hover:opacity-75",
              {
                "pointer-events-none opacity-50": pending,
                "ring-4 ring-sky-500": selectedImageId === image.id,
              },
            )}
            onClick={() => {
              setSelectedImageId(image.id);
            }}
          >
            <input
              type="radio"
              className="hidden"
              name={name}
              checked={selectedImageId === image.id}
              {...props}
              value={`${image.id}|${image.urls.thumb}|${image.urls.full}|${image.links.html}|${image.user.name}`}
              disabled={pending}
            />
            <Image
              fill
              src={image.urls.thumb}
              alt="UnsplashImag"
              className="rounded-md object-cover"
            />
            <Link
              href={image.links.html}
              target="_blank"
              className="absolute inset-x-0 bottom-0 w-full truncate bg-black/50 p-0.5 text-xs text-white opacity-0 hover:underline  group-hover:opacity-100"
            >
              {image.user.name}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
