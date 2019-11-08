import {digits, base} from './number'

const duplicate = string =>
  string
    .split('')
    .map(character => character.repeat(2))
    .join('')

const reverse = string =>
  string
    .split('')
    .reverse()
    .join('')

const randomCharacter = () => digits[Math.floor(Math.random() * base)]
const random = length => Array.from({length}, randomCharacter).join('')

export {duplicate, reverse, random}
