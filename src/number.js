import {FIXED_NUMBER_LENGTH} from './constants'

const digits = 'abcdefghijklmnopqrstuvwxyz'

const base = digits.length

// temp solution for prettier on node 4
// TODO: use padStart(encodedNumber, 'a')
const toFixedLength = encodedNumber =>
  (
    Array.from({length: FIXED_NUMBER_LENGTH}, () => 'a').join('') +
    encodedNumber
  ).slice(-FIXED_NUMBER_LENGTH)

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
