import test from 'ava'
import {duplicate, reverse, random} from './string'

test('duplicate', t => {
  t.is(duplicate('foo'), 'ffoooo')
})

test('reverse', t => {
  t.is(reverse('foo'), 'oof')
})

test('random', t => {
  t.true(/^[a-z]{1}$/.test(random(1)))
  t.true(/^[a-z]{10}$/.test(random(10)))
})
