import { Enables, Peep } from "./types";

export const currentCodePeep = ({
  peepConfig,
  enablesConfig,
}: {
  peepConfig: Peep;
  enablesConfig: Enables;
}) => {
  const isEmptyOrAllUndefined = (obj: Peep) =>
    Object.keys(obj).length === 0 ||
    Object.values(obj).every((value) => value === undefined);

  const peep = isEmptyOrAllUndefined(peepConfig) ? undefined : peepConfig;
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
            ...enables,
          },
          null,
          2,
        );

  return `import { createPeep } from 'peeps-generator';

const peep = createPeep(${config});`;
};
