import {digits, base} from './number'

const randomCharacter = () => digits[Math.floor(Math.random() * base)]
const random = (length = 4) => Array.from({length}, randomCharacter).join('')

export default random
