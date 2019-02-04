import {transform} from '@babel/core';
import {resolve} from 'path';

import babelPlugin from '../../src';

const ROOT_DIR = resolve(`${__dirname}/../..`);
const PKG_DIR = resolve(`${__dirname}/../fixtures`);
const FIXTURE_FILENAME = `${PKG_DIR}/src/foo/bar/index.js`;

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
  describe('using a basic mapping', () => {
    describe('with absolute paths', () => {
      const transformOpts = {
        babelrc: false,
        plugins: [
          [
            babelPlugin,
            {
              resolveRelativePaths: false,
              moduleNameMapper: {
                underscore: 'lodash'
              }
            }
          ]
        ],
        filename: FIXTURE_FILENAME
      };

      describe('should not break regular resolution', () => {
        testRequireImport('express', 'express', transformOpts);
      });

      describe('should properly resolve the file path', () => {
        testRequireImport('underscore', 'lodash', transformOpts);
      });
    });
    describe('with relative paths', () => {
      const transformOpts = {
        babelrc: false,
        plugins: [
          [
            babelPlugin,
            {
              resolveRelativePaths: true,
              moduleNameMapper: {
                underscore: 'lodash'
              }
            }
          ]
        ],
        filename: FIXTURE_FILENAME
      };

      describe('should not break regular resolution', () => {
        testRequireImport('express', 'express', transformOpts);
      });

      describe('should properly resolve the file path', () => {
        testRequireImport('underscore', 'lodash', transformOpts);
      });
    });
  });

  describe('using <pkgDir>', () => {
    describe('with absolute paths', () => {
      const transformOpts = {
        babelrc: false,
        plugins: [
          [
            babelPlugin,
            {
              resolveRelativePaths: false,
              moduleNameMapper: {
                '^src/(.*)': '<pkgDir>/src/$1'
              }
            }
          ]
        ],
        filename: FIXTURE_FILENAME
      };

      describe('should not break regular resolution', () => {
        testRequireImport('express', 'express', transformOpts);
      });

      describe('should properly resolve the file path', () => {
        testRequireImport('src/foo', `${PKG_DIR}/src/foo`, transformOpts);
      });
    });
    describe('with relative paths', () => {
      const transformOpts = {
        babelrc: false,
        plugins: [
          [
            babelPlugin,
            {
              resolveRelativePaths: true,
              moduleNameMapper: {
                '^src/(.*)': '<pkgDir>/src/$1'
              }
            }
          ]
        ],
        filename: FIXTURE_FILENAME
      };

      describe('should not break regular resolution', () => {
        testRequireImport('express', 'express', transformOpts);
      });

      describe('should properly resolve the file path', () => {
        testRequireImport('src/baz', '../../baz', transformOpts);
      });
    });
  });

  describe('using <rootDir>', () => {
    describe('with absolute paths', () => {
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
        filename: FIXTURE_FILENAME
      };

      describe('should not break regular resolution', () => {
        testRequireImport('express', 'express', transformOpts);
      });

      describe('should properly resolve the file path', () => {
        testRequireImport('src/foo', `${ROOT_DIR}/src/foo`, transformOpts);
      });
    });
    describe('with relative paths', () => {
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
        filename: FIXTURE_FILENAME
      };

      describe('should not break regular resolution', () => {
        testRequireImport('express', 'express', transformOpts);
      });

      describe('should properly resolve the file path', () => {
        testRequireImport('src/baz', '../../../../../src/baz', transformOpts);
      });
    });
  });
});
