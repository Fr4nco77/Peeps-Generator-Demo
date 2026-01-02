"use client";
import Button from "@/components/Button";
import CodeSnipet from "@/components/CodeSnipet";
import Enable from "@/components/Enables";
import Header from "@/components/Header";
import PartCarousel from "@/components/PartCarrousel";
import { downloadPeep } from "@/lib/actions";
import { formats, installCode } from "@/lib/const";
import { Colors, Enables, Peep, PeepParts } from "@/lib/types";
import { currentCodePeep } from "@/lib/utils";
import { useEffect, useState } from "react";

export default function Home() {
  const [refresh, setRefresh] = useState<number>(0);
  const [peep, setPeep] = useState<string>("");
  const [parts, setParts] = useState<PeepParts | null>(null);
  const [selectedParts, setSelectedParts] = useState<Peep>({});
  const [colors, setColors] = useState<Colors>({});
  const [enables, setEnables] = useState<Enables>({
    enableAccessories: false,
    enableFacialHair: false,
    enableColors: false,
    enableBackground: false,
  });
  const currentCode = currentCodePeep({
    peepConfig: {
      ...selectedParts,
      ...colors,
    },
    enablesConfig: {
      ...enables,
    },
  });

  useEffect(() => {
    fetch("/api", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((parts) => setParts(parts));
  }, []);

  useEffect(() => {
    fetch("/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        peep: {
          ...selectedParts,
          ...colors,
        },
        size: 350,
        ...enables,
      }),
    })
      .then((res) => res.json())
      .then((svg) => setPeep(svg));
  }, [refresh, enables, colors, selectedParts]);

  const handleEnableChange = (name: string, checked: boolean) => {
    setEnables((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleColorsChange = (name: string, color: string | undefined) => {
    setColors((prev) => ({
      ...prev,
      [name]: color,
    }));
  };

  const carousels = [
    {
      key: "head",
      label: "Heads",
      items: parts?.heads,
    },
    {
      key: "face",
      label: "Faces",
      items: parts?.faces,
    },
    {
      key: "facialHair",
      label: "Facial Hairs",
      items: parts?.facialHair,
    },
    {
      key: "accessories",
      label: "Accessories",
      items: parts?.accessories,
    },
  ] as const;

  return (
    <main className="flex w-full flex-col gap-4 p-4 lg:h-full lg:flex-row">
      <section className="flex w-full flex-col bg-white p-8 md:p-12 lg:w-1/2">
        <Header />
        <CodeSnipet code={installCode} />
        <CodeSnipet
          code={currentCode}
          styles="mt-4 flex flex-1 overflow-y-auto"
        />
        <small className="font-mono">
          For more information, visit the{" "}
          <a
            href="https://www.npmjs.com/package/peeps-generator"
            target="no_blanck"
            className="underline transition-all hover:font-bold"
          >
            documentation
          </a>
          .
        </small>
      </section>
      <section className="flex h-full w-full flex-col justify-evenly gap-10 bg-white py-8 md:py-12 lg:w-1/2 lg:py-8">
        <div className="flex items-center justify-evenly gap-4 max-md:flex-col lg:overflow-x-auto lg:px-4">
          <div dangerouslySetInnerHTML={{ __html: peep }} />
          <div className="space-y-4">
            {parts && (
              <div>
                {carousels.map(({ key, label, items }) => (
                  <PartCarousel
                    key={key}
                    label={label}
                    items={items!}
                    onChange={(value) =>
                      setSelectedParts((prev) => ({
                        ...prev,
                        [key]: value,
                      }))
                    }
                  />
                ))}
              </div>
            )}
            <Enable
              values={enables}
              colors={colors}
              onChange={handleEnableChange}
              onColorChange={handleColorsChange}
            />
            <Button
              onClick={() => setRefresh(refresh + 1)}
              styles="font-title w-full animate-pulse1 hover:animate-none"
            >
              Shuffle
            </Button>
          </div>
        </div>
        <div className="flex w-full flex-wrap items-center justify-center gap-4">
          {formats.map((format) => (
            <Button
              key={format}
              onClick={() => downloadPeep(peep, format)}
              styles="w-20 text-center uppercase font-mono transition-transform duration-500 ease-in-out hover:-translate-y-4"
            >
              {format}
            </Button>
          ))}
        </div>
      </section>
    </main>
  );
}
