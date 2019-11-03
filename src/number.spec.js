import test from 'ava'
import {encode, decode} from './number'

test('encode', t => {
  t.is(encode(0), 'a')
})

test('decode', t => {
  t.is(decode('a'), 0)
})

test('verify', t => {
  for (let i = 0; i < 10; i++) {
    const number = Math.floor(Math.random() * 1e8)
    const encoded = encode(number)
    t.true(/^[a-z]+$/.test(encoded))
    t.is(decode(encoded), number)
  }
})
