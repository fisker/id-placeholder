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
// ppllaacceehhoollddeerraargkoahaaaaaaaaamcunedjrreeddlloohheeccaallpp
// ^^^^^^^^^^^^^^^^^^^^^^
// |> `prefix`: duplicated `"placeholder"`

// ppllaacceehhoollddeerraargkoahaaaaaaaaamcunedjrreeddlloohheeccaallpp
//                       ^^^^^^^^
//                       |> `identity`: random 8 string

// ppllaacceehhoollddeerraargkoahaaaaaaaaamcunedjrreeddlloohheeccaallpp
//                               ^^^^^^^^^^^^^^^^
//                               |> `index`: encoded index `0xdeedbeef`, fixed length 16

// ppllaacceehhoollddeerraargkoahaaaaaaaaamcunedjrreeddlloohheeccaallpp
//                                               ^^^^^^^^^^^^^^^^^^^^^^
//                                               |> `suffix`: reversed string of `prefix`
```

## Api

### new Placeholder(options?)

#### get(index)

get placeholder by index

```js
new Placeholder().get(0xdeedbeef)
```

#### generate()

get auto increased placeholder

```js
const placeholder = new Placeholder()

placeholder.generate()
// ->
// {
//   index: 0,
//   ...,
// }

placeholder.generate()
// ->
// {
//   index: 1,
//   ...,
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
// -> foo...bar

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
  encodedIndex: 'aaaaaaaaamcunedj', // encoded version 0xdeedbeef
  placeholder, // placeholder string
  prefix,
  identity,
  suffix,
}
```

#### isPlaceholder(string)

check is string a placeholder

#### hasPlaceholder(string)

check is string has a placeholder

#### startsWithPlaceholder(string)

check is string starts with a placeholder

#### endsWithPlaceholder(string)

check is string end with a placeholder

#### options

##### options(string)

shortcut for `options.namespace`

```js
new Options('foobar')
// equals to
new Options({namespace: 'foobar'})
```

##### options.namespace

- type: `string`
- default: `"placeholder"`

##### options.prefix

- type: `string`
- default: duplicate string of namespace

```js
new Placeholder({namespace: 'foo'}).prefix
// -> 'ffoooo'
```

##### options.suffix

- type: `string`
- default: reversed string of prefix

```js
new Placeholder({prefix: 'foo'}).suffix
// -> 'oof'
```

```js
new Placeholder({namespace: 'foo'}).suffix
// -> 'ooooff'
```

##### options.identity

- type: `string`
- default: random string of 8 length
