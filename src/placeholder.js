import {FIXED_NUMBER_LENGTH, FIXED_IDENTITY_LENGTH} from './constants'
import {encode, decode} from './number'
import random from './random'
import {duplicate, reverse} from './string'

const getPlaceholderRegExpParts = placeholder => [
  placeholder.prefix,
  placeholder.identity,
  `[a-z]{${FIXED_NUMBER_LENGTH}}`,
  placeholder.suffix,
]

const testResult = (placeholder, string, prefix, suffix) =>
  new RegExp(
    `${prefix}${getPlaceholderRegExpParts(placeholder).join('')}${suffix}`
  ).test(string)

const isAlphabets = string => /^[a-z]*$/.test(string)

class Placeholder {
  constructor(options) {
    if (typeof options === 'string') {
      options = {
        namespace: options,
      }
    }

    const {
      namespace = 'placeholder',
      prefix = duplicate(namespace),
      suffix = reverse(prefix),
      identity = random(FIXED_IDENTITY_LENGTH),
    } = options || {}

    if (
      !isAlphabets(namespace) ||
      !isAlphabets(prefix) ||
      !isAlphabets(suffix) ||
      !isAlphabets(identity)
    ) {
      throw new RangeError(
        'only alphabets(a-z) are allowed in `namespace`, `prefix`, `suffix` and `identity`'
      )
    }

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
    const encodedIndex = encode(index)
    const placeholder = this.get(index)
    this.index += 1
    return {
      ...this,
      index,
      encodedIndex,
      placeholder,
    }
  }

  reset() {
    this.index = 0
    return this
  }

  isPlaceholder(string) {
    return testResult(this, string, '^', '$')
  }

  hasPlaceholder(string) {
    return testResult(this, string, '', '')
  }

  startsWithPlaceholder(string) {
    return testResult(this, string, '^', '')
  }

  endsWithPlaceholder(string) {
    return testResult(this, string, '', '$')
  }

  parse(string) {
    const CAPTURE_SIZE = 4
    const splitRegExp = new RegExp(
      getPlaceholderRegExpParts(this)
        .map(string => `(${string})`)
        .join('')
    )
    const texts = string.split(splitRegExp)
    const pieces = []

    for (let index = 0; index < texts.length; ) {
      const isPlaceholder = index % (CAPTURE_SIZE + 1) !== 0
      if (isPlaceholder) {
        const parts = texts.slice(index, index + CAPTURE_SIZE)
        const placeholder = parts.join('')
        const [prefix, identity, encodedIndex, suffix] = parts

        pieces.push({
          isPlaceholder,
          placeholder,
          prefix,
          identity,
          suffix,
          encodedIndex,
          index: decode(encodedIndex),
        })
        index += CAPTURE_SIZE
      } else {
        const string = texts[index]

        if (string) {
          pieces.push({
            isPlaceholder,
            string,
          })
        }
        index += 1
      }
    }
    return pieces
  }
}

export default Placeholder
