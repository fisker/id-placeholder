import test from 'ava'
import identity from './identity'

test('main', t => {
  const id = identity()
  t.true(/^[a-z]{4}$/.test(id))
})
