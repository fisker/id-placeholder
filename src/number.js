import {
  ALPHABETS as digits,
  ALPHABETS_LENGTH as base,
  FIXED_NUMBER_LENGTH as length,
} from './constants.js'

const PAD_STRING = digits[0].repeat(length)
const toFixedLength = (string) => (PAD_STRING + string).slice(-length)

const encode = (number) =>
  toFixedLength(
    [...number.toString(base)]
      .map((digit) => digits[Number.parseInt(digit, base)])
      .join(''),
  )

const decode = (string) =>
  Number.parseInt(
    [...string].map((digit) => digits.indexOf(digit).toString(base)).join(''),
    base,
  )

export {encode, decode}
export {ALPHABETS as digits, ALPHABETS_LENGTH as base} from './constants.js'
