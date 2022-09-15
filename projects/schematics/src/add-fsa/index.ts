import { experimental } from '@angular-devkit/core';
import { italic, red } from '@angular-devkit/core/src/terminal';
import {
  chain,
  noop,
  Rule,
  SchematicContext,
  SchematicsException,
  Tree,
} from '@angular-devkit/schematics';
import {
  appendHtmlElementToHead,
  getProjectStyleFile,
} from '@angular/cdk/schematics';
import { isImported } from '@schematics/angular/utility/ast-utils';
import { getAppModulePath } from '@schematics/angular/utility/ng-ast-utils';
import { version } from '../../package.json';

import {
  addImport,
  getTsSourceFile,
  addToModuleImportsAndCommitChanges,
} from '@spartacus/schematics';
import {
  FS_STOREFRONT_MODULE,
  FSA_DYNAMIC_FORMS,
  FSA_STOREFRONT,
  FSA_STOREFRONT_STYLES,
  DEFAULT_NGRX_VERSION,
  DEFAULT_ANGULAR_OAUTH2_OIDC_VERSION,
  ANGULAR_LOCALIZE,
} from '../shared/constants';
import { parseCSV } from '../shared/utils/transform-utils';
import { getProjectFromWorkspace } from '../shared/utils/workspace-utils';
import { FSSchema as FsOptions } from './schema';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import {
  addPackageJsonDependency,
  NodeDependency,
  NodeDependencyType,
} from '@schematics/angular/utility/dependencies';
import { getIndexHtmlPath } from '@spartacus/schematics/src/shared/utils/file-utils';
import {
  ANGULAR_OAUTH2_OIDC,
  getProjectTargets,
  SPARTACUS_ASSETS,
  SPARTACUS_CORE,
  SPARTACUS_STOREFINDER,
  SPARTACUS_STOREFRONTLIB,
  SPARTACUS_STYLES,
} from '@spartacus/schematics/src/shared';
import { getSpartacusSchematicsVersion } from '@spartacus/schematics/src/shared/utils/package-utils';
import { getAngularVersion } from '../shared/utils/package-utils';

function prepareSiteContextConfig(options: FsOptions): string {
  const currency = parseCSV(options.currency, ['USD']).toUpperCase();
  const language = parseCSV(options.language, ['en']).toLowerCase();
  let context = `
      context: {
        currency: [${currency}],
        language: [${language}],
        urlParameters: ['baseSite', 'language', 'currency'],`;

  if (options.baseSite) {
    const baseSites = parseCSV(options.baseSite);
    context += `
        baseSite: [${baseSites}]`;
  }
  context += `
      },`;

  return context;
}

function addPackageJsonDependencies(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const spartacusVersion = version;
    const spartacusSchematicsVersion = getSpartacusSchematicsVersion();
    const angularVersion = getAngularVersion(tree);

    const dependencies: NodeDependency[] = [
      {
        type: NodeDependencyType.Default,
        version: spartacusSchematicsVersion,
        name: SPARTACUS_CORE,
      },
      {
        type: NodeDependencyType.Default,
        version: spartacusSchematicsVersion,
        name: SPARTACUS_STOREFINDER,
      },
      {
        type: NodeDependencyType.Default,
        version: spartacusSchematicsVersion,
        name: SPARTACUS_STOREFRONTLIB,
      },
      {
        type: NodeDependencyType.Default,
        version: spartacusSchematicsVersion,
        name: SPARTACUS_ASSETS,
      },
      {
        type: NodeDependencyType.Default,
        version: spartacusSchematicsVersion,
        name: SPARTACUS_STYLES,
      },

      {
        type: NodeDependencyType.Default,
        version: '^7.0.0',
        name: '@ng-bootstrap/ng-bootstrap',
      },
      {
        type: NodeDependencyType.Default,
        version: '^4.0.0',
        name: '@ng-select/ng-select',
      },

      {
        type: NodeDependencyType.Default,
        version: DEFAULT_NGRX_VERSION,
        name: '@ngrx/store',
      },
      {
        type: NodeDependencyType.Default,
        version: DEFAULT_NGRX_VERSION,
        name: '@ngrx/effects',
      },
      {
        type: NodeDependencyType.Default,
        version: DEFAULT_NGRX_VERSION,
        name: '@ngrx/router-store',
      },

      {
        type: NodeDependencyType.Default,
        version: '4.5.0',
        name: 'bootstrap',
      },
      { type: NodeDependencyType.Default, version: '^19.3.4', name: 'i18next' },
      {
        type: NodeDependencyType.Default,
        version: '^3.2.2',
        name: 'i18next-xhr-backend',
      },
      {
        type: NodeDependencyType.Default,
        version: angularVersion,
        name: '@angular/service-worker',
      },
      {
        type: NodeDependencyType.Default,
        version: angularVersion,
        name: ANGULAR_LOCALIZE,
      },
      {
        type: NodeDependencyType.Default,
        version: '^8.0.0',
        name: 'ngx-infinite-scroll',
      },
      {
        type: NodeDependencyType.Default,
        version: DEFAULT_ANGULAR_OAUTH2_OIDC_VERSION,
        name: ANGULAR_OAUTH2_OIDC,
      },
      {
        type: NodeDependencyType.Default,
        version: spartacusVersion,
        name: FSA_STOREFRONT,
      },
      {
        type: NodeDependencyType.Default,
        version: spartacusVersion,
        name: FSA_STOREFRONT_STYLES,
      },
      {
        type: NodeDependencyType.Default,
        version: spartacusVersion,
        name: FSA_DYNAMIC_FORMS,
      },
      {
        type: NodeDependencyType.Default,
        version: '^2.0.2',
        name: 'file-saver',
      },
      {
        type: NodeDependencyType.Default,
        version: '^2.0.2',
        name: 'blob-util',
      },
      {
        type: NodeDependencyType.Default,
        version: '^5.0.2',
        name: 'echarts',
      },
      {
        type: NodeDependencyType.Default,
        version: '^6.0.1',
        name: 'ngx-echarts',
      },
      {
        type: NodeDependencyType.Default,
        version: '^1.5.1',
        name: 'resize-observer-polyfill',
      },
    ];

    dependencies.forEach(dependency => {
      addPackageJsonDependency(tree, dependency);
      context.logger.info(
        `✅️ Added '${dependency.name}' into ${dependency.type}`
      );
    });

    return tree;
  };
}

function getStorefrontConfig(options: FsOptions): string {
  const baseUrlPart = `\n          baseUrl: '${options.baseUrl}',`;
  const context = prepareSiteContextConfig(options);

  return `{
      backend: {
        occ: {${baseUrlPart}
          prefix: '${options.occPrefix}'
        }
      },${context}
      authentication: {
        client_id: '${options.clientId}',
        client_secret: '${options.clientSecret}'
      },
      features: {
        consignmentTracking: ${options.consignmentTracking},
      }
    }`;
}

function updateAppModule(options: FsOptions): Rule {
  return (host: Tree, context: SchematicContext) => {
    context.logger.debug('Updating main module');

    // find app module
    const projectTargets = getProjectTargets(host, options.project);

    if (!projectTargets.build) {
      throw new SchematicsException(`Project target "build" not found.`);
    }

    const mainPath = projectTargets.build.options.main;
    const modulePath = getAppModulePath(host, mainPath);
    context.logger.debug(`main module path: ${modulePath}`);
    const moduleSource = getTsSourceFile(host, modulePath);
    if (!isImported(moduleSource, FS_STOREFRONT_MODULE, FSA_STOREFRONT)) {
      // add imports
      addImport(host, modulePath, FS_STOREFRONT_MODULE, FSA_STOREFRONT);

      addToModuleImportsAndCommitChanges(
        host,
        modulePath,
        `FSStorefrontModule.withConfig(${getStorefrontConfig(options)})`
      );
    }

    return host;
  };
}

function installStyles(project: experimental.workspace.WorkspaceProject): Rule {
  return (host: Tree) => {
    const styleFilePath = getProjectStyleFile(project);

    if (!styleFilePath) {
      console.warn(
        red(`Could not find the default style file for this project.`)
      );
      console.warn(
        red(`Please consider manually setting up spartacus or FSA styles`)
      );
      return;
    }

    if (styleFilePath.split('.').pop() !== 'scss') {
      console.warn(
        red(`Could not find the default SCSS style file for this project. `)
      );
      console.warn(
        red(
          `Please make sure your project is configured with SCSS and consider manually setting up spartacus or FSA styles.`
        )
      );
      return;
    }

    const buffer = host.read(styleFilePath);

    if (!buffer) {
      console.warn(
        red(
          `Could not read the default style file within the project ` +
            `(${italic(styleFilePath)})`
        )
      );
      console.warn(
        red(`Please consider manually importing spartacus or FSA styles.`)
      );
      return;
    }

    const htmlContent = buffer.toString();
    const insertion = `\n@import '~@spartacus/fsa-styles/index';\n`;

    if (htmlContent.includes(insertion)) {
      return;
    }

    const recorder = host.beginUpdate(styleFilePath);

    recorder.insertLeft(htmlContent.length, insertion);
    host.commitUpdate(recorder);
  };
}
function installPackageJsonDependencies(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    context.addTask(new NodePackageInstallTask());
    context.logger.log('info', `🔍 Installing packages...`);
    return tree;
  };
}
function updateMainComponent(
  project: experimental.workspace.WorkspaceProject,
  options: FsOptions
): Rule {
  return (host: Tree, _context: SchematicContext) => {
    const filePath = project.sourceRoot + '/app/app.component.html';
    const buffer = host.read(filePath);

    if (!buffer) {
      console.warn(red(`Could not read app.component.html file.`));
      return;
    }

    const htmlContent = buffer.toString();
    const insertion = `<cx-storefront></cx-storefront>\n`;

    if (htmlContent.includes(insertion)) {
      return;
    }

    const recorder = host.beginUpdate(filePath);

    if (options && options.overwriteAppComponent) {
      recorder.remove(0, htmlContent.length);
      recorder.insertLeft(0, insertion);
    } else {
      recorder.insertLeft(htmlContent.length, `\n${insertion}`);
    }

    host.commitUpdate(recorder);

    return host;
  };
}

/**
 * Returns clean tsconfig.json file by removing possible comments
 */
function cleanAppTsConfig() {
  return (tree: Tree, _context: SchematicContext) => {
    const filePath = 'tsconfig.json';
    const buffer = tree.read(filePath);
    const recorder = tree.beginUpdate(filePath);
    if (buffer) {
      const tsconfigContent = buffer.toString();
      recorder.remove(0, tsconfigContent.indexOf('{'));
    }
    tree.commitUpdate(recorder);
    return tree;
  };
}

/**
 * Fixes module generation in compilerOptions to es2020
 */
function updateAppTsConfig(): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const filePath = 'tsconfig.json';
    const buffer = tree.read(filePath);
    const recorder = tree.beginUpdate(filePath);
    if (buffer) {
      const tsconfigContent = buffer.toString();
      const parsedTsconfig = JSON.parse(tsconfigContent);
      if (parsedTsconfig.compilerOptions.module) {
        recorder.remove(
          tsconfigContent.indexOf(parsedTsconfig.compilerOptions.module),
          parsedTsconfig.compilerOptions.module.length
        );
        recorder.insertLeft(
          tsconfigContent.indexOf(parsedTsconfig.compilerOptions.module),
          'es2020'
        );
      }
    }
    tree.commitUpdate(recorder);
    return tree;
  };
}

function addFonts(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const workspaceConfigBuffer = tree.read('angular.json');
    if (!workspaceConfigBuffer) {
      throw new SchematicsException('Not an Angular CLI workspace');
    }
    const fs = require('fs');
    const path = require('path');
    const workspace = JSON.parse(workspaceConfigBuffer.toString());
    const projectName = workspace.defaultProject;
    const project = workspace.projects[projectName];
    const nodeModulePath = '/node_modules/@spartacus/fsa-styles/fonts';
    const fontTargetPath = '/src/assets/fonts';
    const files: string[] = [];
    tree.getDir(nodeModulePath).visit(filePath => {
      const file = filePath.split('/').slice(-1).toString();
      files.push(file);
    });
    const rootDir = path.dirname(fs.realpathSync(`${project.sourceRoot}`));
    const fontTargetDir = path.normalize(`${rootDir}${fontTargetPath}`);
    const nodeModuleRootPath = path.normalize(`${rootDir}${nodeModulePath}`);
    fs.mkdir(`${fontTargetDir}`, (err: any) => {
      if (err && !(err.code === 'EEXIST')) {
        throw err;
      } else {
        return;
      }
    });
    files.forEach(fileName => {
      context.logger.info(`✅️ Copied '${fileName}' to ${fontTargetDir}`);
      fs.copyFile(
        `${nodeModuleRootPath}/${fileName}`,
        `${fontTargetDir}/${fileName}`,
        (err: any) => {
          if (err) {
            throw err;
          }
        }
      );
    });
  };
}

function updateIndexFile(tree: Tree, options: FsOptions): Rule {
  return (host: Tree) => {
    const projectIndexHtmlPath = getIndexHtmlPath(tree);
    const baseUrl = options.baseUrl || 'OCC_BACKEND_BASE_URL_VALUE';

    const metaTags = [
      `<meta name="occ-backend-base-url" content="${baseUrl}" />`,
      `<meta name="media-backend-base-url" content="MEDIA_BACKEND_BASE_URL_VALUE" />`,
    ];

    metaTags.forEach(metaTag => {
      appendHtmlElementToHead(host, projectIndexHtmlPath, metaTag);
    });

    return host;
  };
}
export function addFsa(options: FsOptions): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const project = getProjectFromWorkspace(tree, options);

    return chain([
      addPackageJsonDependencies(),
      updateAppModule(options),
      installStyles(project),
      updateMainComponent(project, options),
      options.useMetaTags ? updateIndexFile(tree, options) : noop(),
      installPackageJsonDependencies(),
      cleanAppTsConfig(),
      updateAppTsConfig(),
      addFonts(),
    ])(tree, context);
  };
}
