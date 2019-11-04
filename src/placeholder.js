import {encode, decode} from './number'
import random from './random'
import {duplicate, reverse} from './string'

class Placeholder {
  constructor(options) {
    const {
      namespace = 'placeholder',
      prefix = duplicate(namespace),
      suffix = reverse(prefix),
      identity = random(),
    } = options || {}

    this.prefix = prefix
    this.suffix = suffix
    this.identity = identity

    this.reset()
  }

  get(index) {
    return this.prefix + this.identity + encode(index) + this.suffix
  }

  generate() {
    const {index} = this
    const placeholder = this.get(index)
    this.index += 1
    return {
      ...this,
      index,
      placeholder,
    }
  }

  reset() {
    this.index = 0
    return this
  }

  parse(string) {
    const regExp = new RegExp(
      [this.prefix, this.identity, '[a-z]+?', this.suffix]
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
