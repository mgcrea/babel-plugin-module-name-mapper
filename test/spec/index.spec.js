import {transform} from '@babel/core';
import {resolve} from 'path';

import babelPlugin from '../../src';

const ROOT_DIR = resolve(`${__dirname}/../..`);

const testRequireImport = (source, expected, transformOpts) => {
  it('with a require statement', () => {
    const code = `var something = require("${source}");`;
    const result = transform(code, transformOpts);
    expect(result.code).toContain(`require("${expected}")`);
  });
  it('with an import statement', () => {
    const code = `import something from "${source}";`;
    const result = transform(code, transformOpts);
    expect(result.code).toContain(`require("${expected}")`);
  });
};

describe('plugin', () => {
  describe('using <rootDir> with absolute paths', () => {
    const transformOpts = {
      babelrc: false,
      plugins: [
        [
          babelPlugin,
          {
            resolveRelativePaths: false,
            moduleNameMapper: {
              '^src/(.*)': '<rootDir>/src/$1'
            }
          }
        ]
      ],
      filename: `${__dirname}/index.js`
    };

    describe('should not break regular resolution', () => {
      testRequireImport('lodash', 'lodash', transformOpts);
    });

    describe('should properly resolve the file path', () => {
      testRequireImport('src/foo', `${ROOT_DIR}/src/foo`, transformOpts);
    });
  });
  describe('using <rootDir> with relative paths', () => {
    const transformOpts = {
      babelrc: false,
      plugins: [
        [
          babelPlugin,
          {
            resolveRelativePaths: true,
            moduleNameMapper: {
              '^src/(.*)': '<rootDir>/src/$1'
            }
          }
        ]
      ],
      filename: `${ROOT_DIR}/src/foo/bar/index.js`
    };

    describe('should not break regular resolution', () => {
      testRequireImport('lodash', 'lodash', transformOpts);
    });

    describe('should properly resolve the file path', () => {
      testRequireImport('src/baz', '../../baz', transformOpts);
    });
  });
});
