import { LengthKey } from '../types/length-key';

export const LengthConversionTable: {
  [k in LengthKey]: { [t in LengthKey]: number };
} = {
  meter: {
    inch: 39.3701,
    foot: 3.28084,
    centimeter: 100,
    yard: 1.09361,
    meter: 1,
  },
  inch: {
    meter: 0.0254,
    foot: 0.0833333,
    centimeter: 2.54,
    yard: 0.0277778,
    inch: 1,
  },
  foot: {
    meter: 0.3048,
    inch: 12,
    centimeter: 30.48,
    yard: 0.333333,
    foot: 1,
  },
  centimeter: {
    meter: 0.01,
    inch: 0.393701,
    foot: 0.0328084,
    yard: 0.0109361,
    centimeter: 1,
  },
  yard: {
    meter: 0.9144,
    inch: 36,
    foot: 3,
    centimeter: 91.44,
    yard: 1,
  },
} as const;

Object.freeze(LengthConversionTable);
