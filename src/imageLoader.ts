// Loader do next/image para exportação estática: só prefixa o basePath.
export default function imageLoader({ src }: { src: string }) {
  return `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${src}`;
}
