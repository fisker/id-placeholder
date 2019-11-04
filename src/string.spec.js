import test from 'ava'
import {duplicate, reverse} from './string'

test('duplicate', t => {
  t.is(duplicate('foo'), 'ffoooo')
})

test('reverse', t => {
  t.is(reverse('foo'), 'oof')
})
