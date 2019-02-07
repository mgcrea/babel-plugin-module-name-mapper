// @docs https://github.com/shinnn/find-pkg-dir/blob/master/index.js

import memoize from 'lodash.memoize';
import {/* basename, */ dirname, join, parse, resolve} from 'path';
import {existsSync} from 'fs';

// const PKG_ERROR = new Error('package.json not found');
const PKG_FILENAME = 'package.json';
export const lazyFindPkgDir = memoize(dirName => {
  const actualDirName = resolve(dirName);
  const {root} = parse(actualDirName);

  const pkgPath = join(actualDirName, PKG_FILENAME);
  const pkgExists = existsSync(pkgPath);
  if (pkgExists) {
    return dirname(pkgPath);
  }
  if (dirName === root) {
    return null;
  }
  return lazyFindPkgDir(dirname(dirName));
  /*
  try {
    const pkgPath = require.resolve(join(actualDirName, PKG_FILENAME))
    if (basename(pkgPath) !== PKG_FILENAME) {
      throw PKG_ERROR;
    }
    return dirname(pkgPath);
  } catch (err) {
    if (dirName === root) {
      return null;
    }
    return lazyFindPkgDir(dirname(dirName));
  }
  */
});

/**
 * Recursively traverses binary  expressions to find the first `StringLiteral` if any.
 * @param  {Object} t           Babel types
 * @param  {Node} arg           a Babel node
 * @return {StringLiteral?}
 */
export const traverseExpression = (t, arg) => {
  if (t.isStringLiteral(arg)) {
    return arg;
  }
  if (t.isBinaryExpression(arg)) {
    return traverseExpression(t, arg.left);
  }
  return null;
};
