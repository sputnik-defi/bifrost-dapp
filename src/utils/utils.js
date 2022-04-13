import { BigNumber } from "bignumber.js";

export const shortAccountString = (first, last, str) => {
  return str.substring(0, first) + "..." + str.substring(str.length - last);
};

export const bigIntToFloat = (number, decimals, precision) => {
  return new BigNumber(number)
    .div(new BigNumber(10).pow(decimals))
    .toFixed(precision);
};
