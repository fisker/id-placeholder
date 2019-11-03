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
  const placeholder = new Placeholder()
  const orignal = 'PLACEHOLDER'

  const replaced = orignal
    .replace(/L/g, placeholder.get().placeholder)
    .replace(/E/g, placeholder.get().placeholder)

  const parsed = placeholder.parse(replaced)

  const replacement = ['L', 'E']
  const restored = parsed
    .map(piece => {
      if (piece.isPlaceholder) {
        return replacement[piece.index]
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
