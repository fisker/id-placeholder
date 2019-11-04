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

export {duplicate, reverse}
