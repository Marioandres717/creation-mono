/* eslint-disable @typescript-eslint/ban-types */
export function parseStringToNumber(str: unknown): number | undefined {
  return !str ? undefined : isNaN(Number(str)) ? undefined : Number(str);
}

export function omit<Type extends object, Key extends keyof Type>(
  type: Type,
  keys: Key[]
): Omit<Type, Key> {
  const object = { ...type };
  keys.forEach((key) => {
    delete object[key];
  });

  return object;
}

export function numberfy<R, Type extends object, Key extends keyof Type>(
  type: Type,
  keys: Key[]
): R {
  let object: R = <R>{};
  keys.forEach((key) => {
    const { [key]: propToNumberfy, ...obj } = type;
    object = {
      ...obj,
      ...object,
      [key]: parseStringToNumber(propToNumberfy),
    };
  });

  return object;
}
