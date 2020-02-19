# id-placeholder

[![Build Status][github_actions_badge]][github_actions_link]
[![Coverage][coveralls_badge]][coveralls_link]
[![Npm Version][package_version_badge]][package_link]
[![MIT License][license_badge]][license_link]

[github_actions_badge]: https://img.shields.io/github/workflow/status/fisker/id-placeholder/CI/master?style=flat-square
[github_actions_link]: https://github.com/fisker/id-placeholder/actions?query=branch%3Amaster
[coveralls_badge]: https://img.shields.io/coveralls/github/fisker/id-placeholder/master?style=flat-square
[coveralls_link]: https://coveralls.io/github/fisker/id-placeholder?branch=master
[license_badge]: https://img.shields.io/npm/l/id-placeholder.svg?style=flat-square
[license_link]: https://github.com/fisker/id-placeholder/blob/master/license
[package_version_badge]: https://img.shields.io/npm/v/id-placeholder.svg?style=flat-square
[package_link]: https://www.npmjs.com/package/id-placeholder

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

#### split(string)

split string into pieces

```js
const placeholder = new Placeholder()

const string = `foo${placeholder.get(0xdeedbeef)}bar`
// -> foo...bar

placeholder.split(string)
// -> [StringPiece, PlaceholderPiece, StringPiece]
```

##### StringPiece

```js
{
  isPlaceholder: false,
  string: 'foo',
}
```

##### PlaceholderPiece

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
new Placeholder('foobar')
// equals to
new Placeholder({namespace: 'foobar'})
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
