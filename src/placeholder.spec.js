import test from 'ava'
import {FIXED_IDENTITY_LENGTH} from './constants'
import {encode} from './number'
import {duplicate, reverse} from './string'
import Placeholder from './placeholder'

test('alphabets check', t => {
  t.throws(() => new Placeholder('A'), RangeError)
  t.throws(() => new Placeholder({namespace: '1'}), RangeError)
  t.throws(() => new Placeholder({prefix: '$'}), RangeError)
  t.throws(() => new Placeholder({suffix: '-'}), RangeError)
  t.throws(() => new Placeholder({identity: '-'}), RangeError)
})

test('options(string)', t => {
  t.is(new Placeholder('foo').prefix, duplicate('foo'))
})

test('options.prefix', t => {
  t.is(new Placeholder().prefix, duplicate('placeholder'))

  t.is(
    new Placeholder({
      namespace: 'fisker',
    }).prefix,
    duplicate('fisker')
  )
  t.is(
    new Placeholder({
      prefix: 'fisker',
    }).prefix,
    'fisker'
  )
})

test('options.suffix', t => {
  t.is(new Placeholder().suffix, 'rreeddlloohheeccaallpp')

  t.is(
    new Placeholder({
      namespace: 'fisker',
    }).suffix,
    reverse(duplicate('fisker'))
  )

  t.is(
    new Placeholder({
      suffix: 'fisker',
    }).suffix,
    'fisker'
  )

  t.is(
    new Placeholder({
      prefix: 'fisker',
    }).suffix,
    reverse('fisker')
  )
})

test('options.identity', t => {
  t.true(new Placeholder().identity.length === FIXED_IDENTITY_LENGTH)

  t.is(
    new Placeholder({
      identity: 'fisker',
    }).identity,
    'fisker'
  )
})

test('get()', t => {
  const placeholder = new Placeholder({
    prefix: '',
    suffix: '',
    identity: '',
  })

  t.is(placeholder.get(0), encode(0))
  t.is(placeholder.get(0xdeedbeef), encode(0xdeedbeef))
})

test('generate()', t => {
  const placeholder = new Placeholder({
    prefix: '',
    suffix: '',
    identity: '',
  })

  t.deepEqual(placeholder.generate(), {
    ...placeholder,
    index: 0,
    encodedIndex: encode(0),
    placeholder: encode(0),
  })
  t.deepEqual(placeholder.generate(), {
    ...placeholder,
    index: 1,
    encodedIndex: encode(1),
    placeholder: encode(1),
  })

  for (let index = 0; index < 1e4; index++) {
    placeholder.generate()
  }

  t.deepEqual(placeholder.generate(), {
    ...placeholder,
    index: 10002,
    encodedIndex: encode(10002),
    placeholder: encode(10002),
  })
})

test('reset()', t => {
  const placeholder = new Placeholder()

  t.is(placeholder.generate().index, 0)
  placeholder.reset()
  t.is(placeholder.generate().index, 0)
})

test('split()', t => {
  const placeholder = new Placeholder({
    identity: 'test',
  })

  const split = array => {
    const string = array
      .map(item => (typeof item === 'number' ? placeholder.get(item) : item))
      .join('')
    return placeholder
      .split(string)
      .map(({isPlaceholder, string, index}) => (isPlaceholder ? index : string))
  }

  const fixtures = [
    [0],
    [0, 0],
    [0, 0, '_'],
    [0, '_', 0],
    ['_', 0, 0],
    [1],
    [1, 2],
    [1, 2, '_'],
    [1, '_', 2],
    ['_', 1, 2],
  ]

  for (const fixture of fixtures) {
    t.deepEqual(
      split(fixture),
      fixture,
      `parse failed on fixture: ${JSON.stringify(fixture)}`
    )
  }
})
