# id-placeholder

> Safe identity placeholder

## Install

```bash
yarn add id-placeholder
```

## Usage

```js
import Placeholder from 'id-placeholder'

new Placeholder().get(0xdeedbeef)
// -> ppllaacceehhoollddeerrwmwtmcunedjrreeddlloohheeccaallpp
//    ^^^^^^^^^^^^^^^^^^^^^^ prefix: duplicated `placeholder`
// -> ppllaacceehhoollddeerrwmwtmcunedjrreeddlloohheeccaallpp
//                          ^^^^ identity: random 4 string
// -> ppllaacceehhoollddeerrwmwtmcunedjrreeddlloohheeccaallpp
//                              ^^^^^^^ index: encoded index `0xdeedbeef`
// -> ppllaacceehhoollddeerrwmwtmcunedjrreeddlloohheeccaallpp
// ->                                  ^^^^^^^^^^^^^^^^^^^^^^ suffix: reverse of prefix
```

## Api

### new Placeholder(options?)

#### get(index)

get placeholder by index

```js
new Placeholder().get(0)
// -> ppllaacceehhoollddeerrwmwtarreeddlloohheeccaallpp
//                              ^ index: encoded index 0
```

#### generate()

get auto increased placeholder

```js
const placeholder = new Placeholder()

placeholder.generate()
// ->
// {
//   index: 0,
//   placeholder: ppllaacceehhoollddeerrwmwtarreeddlloohheeccaallpp
//                                          ^ index: encoded index 0
// }

placeholder.generate()
// ->
// {
//   index: 1,
//   placeholder: ppllaacceehhoollddeerrwmwtbrreeddlloohheeccaallpp
//                                          ^ index: encoded index 1
// }
```

#### reset()

reset counter

```js
const placeholder = new Placeholder()

placeholder.generate().index
// -> 0

placeholder.generate().index
// -> 1

placeholder.reset()
// reset to counter

placeholder.generate().index
// -> 0
```

#### parse(string)

parse string into pieces

```js
const placeholder = new Placeholder()

const string = `foo${placeholder.get(0xdeedbeef)}bar`
// -> fooppllaacceehhoollddeerrpqeomcunedjrreeddlloohheeccaallppbar

placeholder.parse(string)
// -> [stringPiece, placeholderPiece, stringPiece]
```

##### stringPiece

```js
{
  isPlaceholder: false,
  string: 'foo',
}
```

##### placeholderPiece

```js
{
  isPlaceholder: true,
  index: 3740122863, // 0xdeedbeef
  encodedIndex: 'mcunedj', // encoded version 0xdeedbeef
  placeholder, // placeholder string
  prefix,
  identity,
  suffix,
}
```

#### options

##### options.namespace

- type: `string`
- default: `"placeholder"`

##### options.prefix

- type: `string`
- default: duplicate string of namespace

```js
new Placeholder({
  namespace: 'foo',
}).prefix

// -> 'ffoooo'
```

##### options.suffix

- type: `string`
- default: reversed string of prefix

```js
new Placeholder({
  prefix: 'foo',
}).suffix

// -> 'oof'
```

```js
new Placeholder({
  namespace: 'foo',
}).suffix

// -> 'ooooff'
```

##### options.identity

- type: `string`
- default: random string of 4 length
