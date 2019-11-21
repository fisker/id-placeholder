import {
  ALPHABETS as digits,
  ALPHABETS_LENGTH as base,
  FIXED_NUMBER_LENGTH as length,
} from './constants'

const encode = number =>
  number
    .toString(base)
    .split('')
    .map(digit => digits[parseInt(digit, base)])
    .join('')
    .padStart(length, digits[0])

const decode = string =>
  parseInt(
    string
      .split('')
      .map(digit => digits.indexOf(digit).toString(base))
      .join(''),
    base
  )

export {digits, encode, decode, base}
