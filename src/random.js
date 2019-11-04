import {digits, base} from './number'

const randomCharacter = () => digits[Math.floor(Math.random() * base)]
const random = length => Array.from({length}, randomCharacter).join('')

export default random
