import type { ArtworkList } from "@/hooks/use-artworks"
import type { Comment, Reply } from "@/hooks/use-comments"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export type sortOptions = {
    value: "latest" | "oldest",
    label: "Latest" | "Oldest"
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function truncateString(str: string, num: number) {
  if (str.length > num) {
    return str.slice(0, num) + "..."
  } else {
    return str
  }
}

export function formatDate(date: Date | undefined) {
  if (!(date instanceof Date)) {
    throw new Error("Invalid date");
  }

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}.${month}.${year}`;
}

export function sortItemsByDate<T extends { createdAt: Date }>({
  items, sortOptions
}: {
  items: T[]
  , sortOptions: sortOptions
}): T[] {
  return [...items].sort((a, b) =>
    sortOptions.value === "latest"
      ? new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      : new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );
}

export function loadImageDimenstions(file: File): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve({ width: img.width, height: img.height });
    img.onerror = reject;
    img.src = URL.createObjectURL(file);
  })
}