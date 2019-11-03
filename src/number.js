const digits = 'abcdefghijklmnopqrstuvwxyz'

const base = digits.length

const encode = number =>
  number
    .toString(base)
    .split('')
    .map(digit => digits[parseInt(digit, base)])
    .join('')

const decode = string =>
  parseInt(
    string
      .split('')
      .map(digit => digits.indexOf(digit).toString(base))
      .join(''),
    base
  )

export {digits, encode, decode}
