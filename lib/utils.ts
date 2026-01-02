import { Enables, Peep } from "./types";

export const currentCodePeep = ({
  peepConfig,
  enablesConfig,
}: {
  peepConfig: Peep;
  enablesConfig: Enables;
}) => {
  const peep = Object.keys(peepConfig).length === 0 ? undefined : peepConfig;
  const enables = Object.entries(enablesConfig).some(([, value]) => value)
    ? Object.fromEntries(
        Object.entries(enablesConfig).filter(([, value]) => value),
      )
    : undefined;

  const config =
    !peep && !enables
      ? ""
      : JSON.stringify(
          {
            peep,
            enables,
          },
          null,
          2,
        );

  return `import { createPeep } from 'peeps-generator';

const peep = createPeep(${config});`;
};
