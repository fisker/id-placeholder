import {ALPHABETS as seed, ALPHABETS_LENGTH as length} from './constants.js'

const duplicate = (string) =>
  string
    .split('')
    .map((character) => character.repeat(2))
    .join('')

const reverse = (string) => string.split('').reverse().join('')

const randomCharacter = () => seed[Math.floor(Math.random() * length)]
const random = (length) => Array.from({length}, randomCharacter).join('')
const wrap = (string, prefix, suffix = prefix) => prefix + string + suffix

export {duplicate, reverse, random, wrap}
