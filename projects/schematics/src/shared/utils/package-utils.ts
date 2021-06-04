import { SchematicsException, Tree } from '@angular-devkit/schematics';
import {
  ANGULAR_CORE,
  UTF_8,
} from '@spartacus/schematics/src/shared/constants';
import { DEFAULT_ANGULAR_VERSION } from '../constants';

export function readPackageJson(tree: Tree): any {
  const pkgPath = '/package.json';
  const buffer = tree.read(pkgPath);
  if (!buffer) {
    throw new SchematicsException('Could not find package.json');
  }

  return JSON.parse(buffer.toString(UTF_8));
}

export function getAngularVersion(tree: Tree, useFallback = true): string {
  const packageJsonObject = readPackageJson(tree);
  let packageJsonVersion = '';
  if (packageJsonObject) {
    packageJsonVersion = packageJsonObject.dependencies[ANGULAR_CORE];
  }
  return packageJsonVersion || (useFallback ? DEFAULT_ANGULAR_VERSION : '');
}
