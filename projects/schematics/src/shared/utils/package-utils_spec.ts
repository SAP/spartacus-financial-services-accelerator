import {
  SchematicTestRunner,
  UnitTestTree,
} from '@angular-devkit/schematics/testing';
import * as path from 'path';
import {
  ANGULAR_CORE,
  UTF_8,
} from '@spartacus/schematics/src/shared/constants';
import { getAngularVersion, readPackageJson } from './package-utils';

const collectionPath = path.join(__dirname, '../../collection.json');
const schematicRunner = new SchematicTestRunner('schematics', collectionPath);

describe('Package utils', () => {
  let appTree: UnitTestTree;
  const workspaceOptions: any = {
    name: 'workspace',
    version: '0.5.0',
  };
  const appOptions: any = {
    name: 'schematics-test',
    inlineStyle: false,
    inlineTemplate: false,
    routing: false,
    style: 'scss',
    skipTests: false,
    projectRoot: '',
  };
  const defaultOptions = {
    project: 'schematics-test',
  };

  beforeEach(async () => {
    appTree = await schematicRunner
      .runExternalSchematicAsync(
        '@schematics/angular',
        'workspace',
        workspaceOptions
      )
      .toPromise();
    appTree = await schematicRunner
      .runExternalSchematicAsync(
        '@schematics/angular',
        'application',
        appOptions,
        appTree
      )
      .toPromise();
    appTree = await schematicRunner
      .runSchematicAsync('add-fsa', defaultOptions, appTree)
      .toPromise();
  });

  describe('readPackageJson', () => {
    it('should return parsed package.json content', async () => {
      const buffer = appTree.read('package.json');

      if (buffer) {
        const packageJsonObject = JSON.parse(buffer.toString(UTF_8));
        expect(packageJsonObject).toEqual(readPackageJson(appTree));
      }
    });
  });

  describe('getAngularVersion', () => {
    it('should return angular version', async () => {
      const testVersion = '5.5.5';
      const buffer = appTree.read('package.json');

      if (buffer) {
        const packageJsonObject = JSON.parse(buffer.toString(UTF_8));
        packageJsonObject.dependencies[ANGULAR_CORE] = testVersion;
        appTree.overwrite('package.json', JSON.stringify(packageJsonObject));
        const version = getAngularVersion(appTree);
        expect(version).toEqual(testVersion);
      }
    });
  });
});
