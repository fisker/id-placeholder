import test from 'ava'
import Placeholder from './placeholder.js'

const placeholder = new Placeholder()
const anotherPlaceholder = new Placeholder()

test('isPlaceholder', (t) => {
  t.true(placeholder.isPlaceholder(placeholder.get(0xde_ed_be_ef)))
  t.false(placeholder.isPlaceholder(`foo${placeholder.get(0xde_ed_be_ef)}bar`))
  t.false(placeholder.isPlaceholder(`foo${placeholder.get(0xde_ed_be_ef)}`))
  t.false(placeholder.isPlaceholder(`${placeholder.get(0xde_ed_be_ef)}bar`))
  t.false(
    placeholder.isPlaceholder(
      `${placeholder.get(0xde_ed_be_ef)}${placeholder.get(0xde_ed_be_ef)}`,
    ),
  )
  t.false(placeholder.isPlaceholder(anotherPlaceholder.get(0xde_ed_be_ef)))
})

test('hasPlaceholder', (t) => {
  t.true(placeholder.hasPlaceholder(placeholder.get(0xde_ed_be_ef)))
  t.true(placeholder.hasPlaceholder(`foo${placeholder.get(0xde_ed_be_ef)}bar`))
  t.true(placeholder.hasPlaceholder(`foo${placeholder.get(0xde_ed_be_ef)}`))
  t.true(placeholder.hasPlaceholder(`${placeholder.get(0xde_ed_be_ef)}bar`))
  t.false(placeholder.hasPlaceholder(anotherPlaceholder.get(0xde_ed_be_ef)))
  t.true(
    placeholder.hasPlaceholder(
      anotherPlaceholder.get(0xde_ed_be_ef) + placeholder.get(0xde_ed_be_ef),
    ),
  )
})
test('startsWithPlaceholder', (t) => {
  t.true(placeholder.startsWithPlaceholder(placeholder.get(0xde_ed_be_ef)))
  t.false(
    placeholder.startsWithPlaceholder(
      `foo${placeholder.get(0xde_ed_be_ef)}bar`,
    ),
  )
  t.false(
    placeholder.startsWithPlaceholder(`foo${placeholder.get(0xde_ed_be_ef)}`),
  )
  t.true(
    placeholder.startsWithPlaceholder(`${placeholder.get(0xde_ed_be_ef)}bar`),
  )
  t.false(
    placeholder.startsWithPlaceholder(anotherPlaceholder.get(0xde_ed_be_ef)),
  )
  t.true(
    placeholder.startsWithPlaceholder(
      placeholder.get(0xde_ed_be_ef) + anotherPlaceholder.get(0xde_ed_be_ef),
    ),
  )
  t.false(
    placeholder.startsWithPlaceholder(
      anotherPlaceholder.get(0xde_ed_be_ef) + placeholder.get(0xde_ed_be_ef),
    ),
  )
})
test('endsWithPlaceholder', (t) => {
  t.true(placeholder.endsWithPlaceholder(placeholder.get(0xde_ed_be_ef)))
  t.false(
    placeholder.endsWithPlaceholder(`foo${placeholder.get(0xde_ed_be_ef)}bar`),
  )
  t.true(
    placeholder.endsWithPlaceholder(`foo${placeholder.get(0xde_ed_be_ef)}`),
  )
  t.false(
    placeholder.endsWithPlaceholder(`${placeholder.get(0xde_ed_be_ef)}bar`),
  )
  t.false(
    placeholder.endsWithPlaceholder(anotherPlaceholder.get(0xde_ed_be_ef)),
  )
  t.false(
    placeholder.endsWithPlaceholder(
      placeholder.get(0xde_ed_be_ef) + anotherPlaceholder.get(0xde_ed_be_ef),
    ),
  )
  t.true(
    placeholder.endsWithPlaceholder(
      anotherPlaceholder.get(0xde_ed_be_ef) + placeholder.get(0xde_ed_be_ef),
    ),
  )
})
