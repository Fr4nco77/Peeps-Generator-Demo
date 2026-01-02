import { CarouselProps } from "@/lib/types";
import { useState } from "react";

export default function PartsCarousel({
  label,
  items,
  onChange,
}: CarouselProps) {
  const [index, setIndex] = useState(0);

  const total = items.length + 1;
  const currentItem = index === 0 ? "Random" : items[index - 1];

  const emitChange = (newIndex: number) => {
    if (newIndex === 0) {
      onChange(undefined);
    } else {
      onChange(items[newIndex - 1]);
    }
  };

  const next = () => {
    const newIndex = (index + 1) % total;
    setIndex(newIndex);
    emitChange(newIndex);
  };

  const prev = () => {
    const newIndex = (index - 1 + total) % total;
    setIndex(newIndex);
    emitChange(newIndex);
  };

  return (
    <div className="flex items-center gap-4 font-mono">
      <button onClick={prev} className="border px-2 py-1">
        ◀
      </button>

      <div className="flex min-w-36 flex-col items-center">
        <span className="text-xs uppercase opacity-60">{label}</span>
        <span className="text-center font-semibold">{currentItem}</span>
      </div>

      <button onClick={next} className="border px-2 py-1">
        ▶
      </button>
    </div>
  );
}
