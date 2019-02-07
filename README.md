# Babel Module Name Mapper Plugin

![status](https://img.shields.io/badge/status-maintained-brightgreen.svg)
[![npm version](https://img.shields.io/npm/v/babel-plugin-module-name-mapper.svg)](https://www.npmjs.com/package/babel-plugin-module-name-mapper)
[![npm downloads](https://img.shields.io/npm/dm/babel-plugin-module-name-mapper.svg)](https://www.npmjs.com/package/babel-plugin-module-name-mapper)
[![license](https://img.shields.io/github/license/mgcrea/babel-plugin-module-name-mapper.svg?style=flat)](https://tldrlegal.com/license/mit-license)<br />
[![build status](http://img.shields.io/travis/mgcrea/babel-plugin-module-name-mapper/master.svg?style=flat)](http://travis-ci.org/mgcrea/babel-plugin-module-name-mapper)
[![dependencies status](https://img.shields.io/david/mgcrea/babel-plugin-module-name-mapper.svg?style=flat)](https://david-dm.org/mgcrea/babel-plugin-module-name-mapper)
[![devDependencies status](https://img.shields.io/david/dev/mgcrea/babel-plugin-module-name-mapper.svg?style=flat)](https://david-dm.org/mgcrea/babel-plugin-module-name-mapper#info=devDependencies)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/a9aef0592ea44fae88864321d5f14473)](https://www.codacy.com/app/mgcrea/babel-plugin-module-name-mapper?utm_source=github.com&utm_medium=referral&utm_content=mgcrea/babel-plugin-module-name-mapper&utm_campaign=Badge_Grade)
[![Codacy Badge](https://api.codacy.com/project/badge/Coverage/a9aef0592ea44fae88864321d5f14473)](https://www.codacy.com/app/mgcrea/babel-plugin-module-name-mapper?utm_source=github.com&utm_medium=referral&utm_content=mgcrea/babel-plugin-module-name-mapper&utm_campaign=Badge_Coverage)

This plugin adds a Jest-like [moduleNameMapper](https://jestjs.io/docs/en/configuration.html#modulenamemapper-object-string-string) option as a babel plugin.

It mostly adds a `<pkgDir>` string token that will resolve to the dirname of the closest `package.json` in order to support monorepos, (which is lacking for now in both Jest/Webpack).

It also supports the classic `<rootDir>` string token.

## Usage

This plugin allows you to drop relative path usage for prefixed paths.

```js
// Instead of:
import fooHelper from './../../../helpers/foo.js';
// You can write:
import fooHelper from 'src/helpers/example.js';

// No more relative path hell 🎉
```

### Quickstart

```
yarn add --dev babel-plugin-module-name-mapper
```

1. Add the plugin to your `.babel.config.js` (or `.babelrc`)

```js
module.exports = {
  presets: [['@babel/preset-env']],
  plugins: [
    [
      'module-name-mapper',
      {
        moduleNameMapper: {
          '^src/(.*)': '<pkgDir>/src/$1'
        }
      }
    ]
  ]
};
```

### Other examples

```js
module.exports = {
  presets: [['@babel/preset-env']],
  plugins: [
    [
      'module-name-mapper',
      {
        moduleNameMapper: {
          '^src/(.*)': '<pkgDir>/src/$1',
          '^image![a-zA-Z0-9$_-]+$': 'GlobalImageStub',
          '^[./a-zA-Z0-9$_-]+\\.png$': '<rootDir>/RelativeImageStub.js',
          '^module_name_(.*)': '<rootDir>/substituted_module_$1.js',
          underscore: 'lodash'
        }
      }
    ]
  ]
};
```

> Note: If you provide module name without boundaries `^\$` it may cause hard to spot errors. E.g. relay will replace all modules which contain relay as a substring in its name: relay, react-relay and graphql-relay will all be pointed to your stub.

### Available scripts

| **Script**  | **Description**               |
| ----------- | ----------------------------- |
| start       | Alias of test:watch           |
| test        | Run jest unit tests           |
| test:watch  | Run and watch jest unit tests |
| lint        | Run eslint static tests       |
| build       | Compile the library           |
| build:watch | Compile and watch the library |

## Authors

**Olivier Louvignes**

- http://olouv.com
- http://github.com/mgcrea

Implementation inspired by [babel-plugin-module-resolver](https://github.com/tleunen/babel-plugin-module-resolver) by [@tleunen](https://github.com/tleunen)

## License

```
The MIT License

Copyright (c) 2019 Olivier Louvignes

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
```
