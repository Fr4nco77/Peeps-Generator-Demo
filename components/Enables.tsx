import { EnablesProps } from "@/lib/types";

export default function Enables({
  values,
  colors,
  onChange,
  onColorChange,
}: EnablesProps) {
  const handleInputCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.currentTarget;
    onChange(name, checked);
  };

  return (
    <div className="flex flex-col gap-2">
      {Object.entries(values).map(([key, value]) => (
        <div key={key} className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <input
              id={key}
              name={key}
              type="checkbox"
              checked={value}
              onChange={handleInputCheckbox}
              className="relative size-5 cursor-pointer appearance-none border before:absolute before:top-1/2 before:left-1/2 before:size-[80%] before:-translate-x-1/2 before:-translate-y-1/2 before:bg-transparent checked:before:bg-black focus:outline-none"
            />
            <label
              htmlFor={key}
              className="font-mono text-sm font-semibold uppercase"
            >
              {key.replace(/^enable/, "")}
            </label>
          </div>

          {/* 🎨 Background color */}
          {key === "enableBackground" && value && (
            <div className="ml-8 flex items-center gap-4">
              <label className="flex items-center gap-2 font-mono text-xs">
                <input
                  type="checkbox"
                  checked={colors.background === undefined}
                  onChange={(e) =>
                    onColorChange(
                      "background",
                      e.target.checked ? undefined : "#ffffff",
                    )
                  }
                  className="relative size-5 cursor-pointer appearance-none border before:absolute before:top-1/2 before:left-1/2 before:size-[80%] before:-translate-x-1/2 before:-translate-y-1/2 before:bg-transparent checked:before:bg-black focus:outline-none"
                />
                RANDOM
              </label>

              <input
                aria-label="COLOR"
                type="color"
                disabled={!colors.background}
                value={colors.background ?? "#000000"}
                onChange={(e) => onColorChange("background", e.target.value)}
              />
            </div>
          )}

          {/* 🎨 Skin + Facial Hair colors */}
          {key === "enableColors" && value && (
            <div className="ml-8 flex flex-col gap-3">
              {/* Skin */}
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 font-mono text-xs">
                  <input
                    type="checkbox"
                    checked={colors.skinColor === undefined}
                    onChange={(e) =>
                      onColorChange(
                        "skinColor",
                        e.target.checked ? undefined : "#f2c9ac",
                      )
                    }
                    className="relative size-5 cursor-pointer appearance-none border before:absolute before:top-1/2 before:left-1/2 before:size-[80%] before:-translate-x-1/2 before:-translate-y-1/2 before:bg-transparent checked:before:bg-black focus:outline-none"
                  />
                  RANDOM
                </label>

                <input
                  aria-label="COLOR"
                  type="color"
                  disabled={!colors.skinColor}
                  value={colors.skinColor ?? "#f2c9ac"}
                  onChange={(e) => onColorChange("skinColor", e.target.value)}
                />
              </div>

              {/* Hair */}
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 font-mono text-xs">
                  <input
                    type="checkbox"
                    checked={colors.hairColor === undefined}
                    onChange={(e) =>
                      onColorChange(
                        "hairColor",
                        e.target.checked ? undefined : "#000000",
                      )
                    }
                    className="relative size-5 cursor-pointer appearance-none border before:absolute before:top-1/2 before:left-1/2 before:size-[80%] before:-translate-x-1/2 before:-translate-y-1/2 before:bg-transparent checked:before:bg-black focus:outline-none"
                  />
                  RANDOM
                </label>
                <input
                  type="color"
                  aria-label="COLOR"
                  disabled={!colors.hairColor}
                  value={colors.hairColor ?? "#000000"}
                  onChange={(e) => onColorChange("hairColor", e.target.value)}
                />
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
