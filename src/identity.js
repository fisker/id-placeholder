import {encode} from './number'

const identity = () =>
  encode(Math.floor(Math.random() * Date.now())).slice(0, 4)

export default identity
