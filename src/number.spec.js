import test from 'ava'
import {FIXED_NUMBER_LENGTH as length} from './constants'
import {encode, decode} from './number'

test('encode', t => {
  t.is(encode(0), 'a'.repeat(length))
})

test('decode', t => {
  t.is(decode('a'.repeat(length)), 0)
})

test('verify', t => {
  for (let i = 0; i < 10; i++) {
    const number = Math.floor(Math.random() * 1e8)
    const encoded = encode(number)
    t.is(encoded.length, length)
    t.is(decode(encoded), number)
  }
})
