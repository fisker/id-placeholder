import {
  ALPHABETS as digits,
  ALPHABETS_LENGTH as base,
  FIXED_NUMBER_LENGTH as length,
} from './constants'

let toFixedLength

/* istanbul ignore else */
if (String.prototype.padStart) {
  toFixedLength = string => string.padStart(length, digits[0])
} else {
  const PAD_STRING = Array.from({length})
    .fill(digits[0])
    .join('')
  toFixedLength = string => (PAD_STRING + string).slice(-length)
}

const encode = number =>
  toFixedLength(
    number
      .toString(base)
      .split('')
      .map(digit => digits[parseInt(digit, base)])
      .join('')
  )

const decode = string =>
  parseInt(
    string
      .split('')
      .map(digit => digits.indexOf(digit).toString(base))
      .join(''),
    base
  )

export {digits, encode, decode, base}
