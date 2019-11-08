import {
  ALPHABETS as digits,
  ALPHABETS_LENGTH as base,
  FIXED_NUMBER_LENGTH as length,
} from './constants'

// temp solution for prettier on node 4
// TODO: use padStart(encodedNumber, 'a')
const toFixedLength = encodedNumber =>
  (Array.from({length}, () => 'a').join('') + encodedNumber).slice(-length)

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
