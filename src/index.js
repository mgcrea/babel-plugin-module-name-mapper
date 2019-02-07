import {dirname, relative} from 'path';
import {lazyFindPkg, traverseExpression} from './utils';

// require('debug-utils').install();

const INDEXED_REPLACE_REGEX = /\$\d+/g;

const mapModuleNames = (path, opts, fileOpts) => {
  const {moduleNameMapper, resolveRelativePaths = true} = opts;
  const {root, filename} = fileOpts;
  if (!moduleNameMapper) {
    return path;
  }
  const fileDirname = dirname(filename);
  let nextPath = path;
  Object.keys(moduleNameMapper).forEach(find => {
    const replace = moduleNameMapper[find];
    const matches = path.match(new RegExp(find));
    if (!matches) {
      return;
    }
    nextPath = replace;
    const replaceUsesRootDir = replace.includes('<rootDir>');
    if (replaceUsesRootDir) {
      nextPath = nextPath.replace('<rootDir>', root);
    }
    const replaceUsesPkgDir = replace.includes('<pkgDir>');
    if (replaceUsesPkgDir) {
      const pkgDir = lazyFindPkg(fileDirname);
      nextPath = nextPath.replace('<pkgDir>', pkgDir);
    }
    const replaceUsedIndexes = replace.match(INDEXED_REPLACE_REGEX);
    if (replaceUsedIndexes) {
      replaceUsedIndexes.forEach(index => {
        const replacedValue = matches[index.slice(1) * 1];
        // nextPath = nextPath.replace(new RegExp(index, 'g'), replacedValue);
        nextPath = nextPath.split(index).join(replacedValue);
      });
    }
    const replaceCouldBeRelative = replaceUsesRootDir || replaceUsesPkgDir;
    if (replaceCouldBeRelative && resolveRelativePaths) {
      nextPath = relative(fileDirname, nextPath);
    }
  });

  return nextPath;
};

export default ({types: t}) => {
  const visitor = {
    CallExpression(path, state) {
      if (!(path.node.callee.name === 'require' || t.isImport(path.node.callee))) {
        return;
      }

      const args = path.node.arguments;
      if (!args.length) {
        return;
      }

      const firstArg = traverseExpression(t, args[0]);

      if (firstArg) {
        firstArg.value = mapModuleNames(firstArg.value, state.opts, state.file.opts);
      }
    },
    ImportDeclaration(path, state) {
      path.node.source.value = mapModuleNames(path.node.source.value, state.opts, state.file.opts); // eslint-disable-line no-param-reassign
    },
    ExportNamedDeclaration(path, state) {
      if (path.node.source) {
        path.node.source.value = mapModuleNames(path.node.source.value, state.opts, state.file.opts); // eslint-disable-line no-param-reassign
      }
    },
    ExportAllDeclaration(path, state) {
      if (path.node.source) {
        path.node.source.value = mapModuleNames(path.node.source.value, state.opts, state.file.opts); // eslint-disable-line no-param-reassign
      }
    }
  };
  return {
    visitor: {
      Program(path, state) {
        path.traverse(visitor, state);
      }
    }
  };
};
