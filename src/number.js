import {
  ALPHABETS as digits,
  ALPHABETS_LENGTH as base,
  FIXED_NUMBER_LENGTH as length,
} from './constants'

const PAD_STRING = digits[0].repeat(length)
const toFixedLength = (string) => (PAD_STRING + string).slice(-length)

const encode = (number) =>
  toFixedLength(
    number
      .toString(base)
      .split('')
      .map((digit) => digits[parseInt(digit, base)])
      .join('')
  )

const decode = (string) =>
  parseInt(
    string
      .split('')
      .map((digit) => digits.indexOf(digit).toString(base))
      .join(''),
    base
  )

export {digits, encode, decode, base}
