import test from 'ava'
import {duplicate, reverse, random, wrap} from './string.js'

test('duplicate', (t) => {
  t.is(duplicate('foo'), 'ffoooo')
})

test('reverse', (t) => {
  t.is(reverse('foo'), 'oof')
})

test('random', (t) => {
  t.true(/^[a-z]$/.test(random(1)))
  t.true(/^[a-z]{10}$/.test(random(10)))
})

test('wrap', (t) => {
  t.is(wrap('foo', '"'), '"foo"')
  t.is(wrap('foo', '{', '}'), '{foo}')
})
