import {memoize} from 'lodash';
import {dirname} from 'path';
import findPkg from 'find-pkg';

export const lazyFindPkg = memoize(filename => dirname(findPkg.sync(filename)));

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
