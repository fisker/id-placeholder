import test from 'ava'
import Placeholder from './placeholder'

test('index', t => {
  const placeholder = new Placeholder()

  t.is(placeholder.get().index, 0)
  t.is(placeholder.get().index, 1)
  t.is(placeholder.get(5).index, 5)
})

test('prefix', t => {
  t.is(new Placeholder().prefix, 'ppllaacceehhoollddeerr')

  t.is(
    new Placeholder({
      namespace: 'fisker',
    }).prefix,
    'ffiisskkeerr'
  )
  t.is(
    new Placeholder({
      prefix: 'fisker',
    }).prefix,
    'fisker'
  )
})

test('suffix', t => {
  t.is(new Placeholder().suffix, 'rreeddlloohheeccaallpp')

  t.is(
    new Placeholder({
      namespace: 'fisker',
    }).suffix,
    'rreekkssiiff'
  )

  t.is(
    new Placeholder({
      suffix: 'fisker',
    }).suffix,
    'fisker'
  )
})

test('identity', t => {
  t.true(/^[a-z]{4}$/.test(new Placeholder().identity))

  t.is(
    new Placeholder({
      identity: 'fisker',
    }).identity,
    'fisker'
  )
})

test('parse', t => {
  const placeholder = new Placeholder({
    identity: 'test',
  })
  const orignal = 'PLACEHOLDER'

  const replacements = [
    {
      string: 'L',
      placeholder: placeholder.get(0).placeholder,
    },
    {
      string: 'A',
      placeholder: placeholder.get(1).placeholder,
    },
    {
      string: 'E',
      placeholder: placeholder.get(2).placeholder,
    },
  ]

  let replaced = orignal
  for (const {string, placeholder} of replacements) {
    replaced = replaced.replace(new RegExp(string, 'g'), placeholder)
  }

  const parsed = placeholder.parse(replaced)

  const restored = parsed
    .map(piece => {
      if (piece.isPlaceholder) {
        return replacements[piece.index].string
      }

      return piece.string
    })
    .join('')

  t.is(restored, orignal)

  t.snapshot({
    orignal,
    restored,
    replaced,
    parsed,
  })
})
