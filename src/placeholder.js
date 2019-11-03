import {encode, decode} from './number'
import identity from './identity'

class Placeholder {
  constructor(options) {
    options = {
      namespace: 'placeholder',
      identity: identity(),
      ...options,
    }

    const repeatedNS = options.namespace
      .split('')
      .map(character => character.repeat(2))

    this.prefix = options.prefix || repeatedNS.join('')
    this.suffix = options.suffix || repeatedNS.reverse().join('')
    this.identity = options.identity
    this.autoIndex = 0
  }

  get(index) {
    if (arguments.length === 0) {
      index = this.autoIndex
      this.autoIndex += 1
    }

    return {
      ...this,
      index,
      placeholder: this.prefix + this.identity + encode(index) + this.suffix,
    }
  }

  parse(string) {
    const regExp = new RegExp(
      [this.prefix, this.identity, '[a-z]+', this.suffix]
        .map(string => `(${string})`)
        .join(''),
      'g'
    )
    const pieces = []
    let lastIndex = 0
    while (lastIndex < string.length) {
      const match = regExp.exec(string)

      if (!match) {
        pieces.push({
          isPlaceholder: false,
          string: string.slice(lastIndex, string.length),
        })
        break
      }

      const [placeholder, prefix, identity, encodedIndex, suffix] = match
      const {index} = match
      if (index !== lastIndex) {
        pieces.push({
          isPlaceholder: false,
          string: string.slice(lastIndex, index),
        })
      }
      pieces.push({
        isPlaceholder: true,
        placeholder,
        prefix,
        identity,
        suffix,
        encodedIndex,
        index: decode(encodedIndex),
      })
      lastIndex = regExp.lastIndex
    }

    return pieces
  }
}

export default Placeholder
