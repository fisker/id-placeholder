import test from 'ava'
import random from './random'

test('main', t => {
  const id = random()
  t.true(/^[a-z]{4}$/.test(id))
})
