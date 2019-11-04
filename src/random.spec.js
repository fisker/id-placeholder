import test from 'ava'
import random from './random'

test('main', t => {
  t.true(/^[a-z]{1}$/.test(random(1)))
  t.true(/^[a-z]{10}$/.test(random(10)))
})
