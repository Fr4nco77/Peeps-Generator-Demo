type ExportFormat = "svg" | "png" | "jpg" | "jpeg" | "webp" | "avif";

export async function downloadPeep(svg: string, format: ExportFormat = "svg") {
  if (format === "svg") {
    const blob = new Blob([svg], {
      type: "image/svg+xml;charset=utf-8",
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");

    a.href = url;
    a.download = "peep.svg";
    a.click();

    URL.revokeObjectURL(url);
    return;
  }

  const res = await fetch(`/api/export?format=${format}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ svg }),
  });

  if (!res.ok) {
    throw new Error("Error to export the image");
  }

  const blob = await res.blob();

  const disposition = res.headers.get("Content-Disposition");
  const match = disposition?.match(/filename="(.+)"/);
  const filename = match?.[1] ?? `peep.${format}`;

  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");

  a.href = url;
  a.download = filename;
  a.click();

  URL.revokeObjectURL(url);
}
