import test from 'ava'
import Placeholder from './placeholder'

const placeholder = new Placeholder()
const anotherPlaceholder = new Placeholder()

test('isPlaceholder', t => {
  t.true(placeholder.isPlaceholder(placeholder.get(0xdeedbeef)))
  t.false(placeholder.isPlaceholder(`foo${placeholder.get(0xdeedbeef)}bar`))
  t.false(placeholder.isPlaceholder(`foo${placeholder.get(0xdeedbeef)}`))
  t.false(placeholder.isPlaceholder(`${placeholder.get(0xdeedbeef)}bar`))
  t.false(
    placeholder.isPlaceholder(
      `${placeholder.get(0xdeedbeef)}${placeholder.get(0xdeedbeef)}`
    )
  )
  t.false(placeholder.isPlaceholder(anotherPlaceholder.get(0xdeedbeef)))
})

test('hasPlaceholder', t => {
  t.true(placeholder.hasPlaceholder(placeholder.get(0xdeedbeef)))
  t.true(placeholder.hasPlaceholder(`foo${placeholder.get(0xdeedbeef)}bar`))
  t.true(placeholder.hasPlaceholder(`foo${placeholder.get(0xdeedbeef)}`))
  t.true(placeholder.hasPlaceholder(`${placeholder.get(0xdeedbeef)}bar`))
  t.false(placeholder.hasPlaceholder(anotherPlaceholder.get(0xdeedbeef)))
  t.true(
    placeholder.hasPlaceholder(
      anotherPlaceholder.get(0xdeedbeef) + placeholder.get(0xdeedbeef)
    )
  )
})
test('startsWithPlaceholder', t => {
  t.true(placeholder.startsWithPlaceholder(placeholder.get(0xdeedbeef)))
  t.false(
    placeholder.startsWithPlaceholder(`foo${placeholder.get(0xdeedbeef)}bar`)
  )
  t.false(
    placeholder.startsWithPlaceholder(`foo${placeholder.get(0xdeedbeef)}`)
  )
  t.true(placeholder.startsWithPlaceholder(`${placeholder.get(0xdeedbeef)}bar`))
  t.false(placeholder.startsWithPlaceholder(anotherPlaceholder.get(0xdeedbeef)))
  t.true(
    placeholder.startsWithPlaceholder(
      placeholder.get(0xdeedbeef) + anotherPlaceholder.get(0xdeedbeef)
    )
  )
  t.false(
    placeholder.startsWithPlaceholder(
      anotherPlaceholder.get(0xdeedbeef) + placeholder.get(0xdeedbeef)
    )
  )
})
test('endsWithPlaceholder', t => {
  t.true(placeholder.endsWithPlaceholder(placeholder.get(0xdeedbeef)))
  t.false(
    placeholder.endsWithPlaceholder(`foo${placeholder.get(0xdeedbeef)}bar`)
  )
  t.true(placeholder.endsWithPlaceholder(`foo${placeholder.get(0xdeedbeef)}`))
  t.false(placeholder.endsWithPlaceholder(`${placeholder.get(0xdeedbeef)}bar`))
  t.false(placeholder.endsWithPlaceholder(anotherPlaceholder.get(0xdeedbeef)))
  t.false(
    placeholder.endsWithPlaceholder(
      placeholder.get(0xdeedbeef) + anotherPlaceholder.get(0xdeedbeef)
    )
  )
  t.true(
    placeholder.endsWithPlaceholder(
      anotherPlaceholder.get(0xdeedbeef) + placeholder.get(0xdeedbeef)
    )
  )
})
