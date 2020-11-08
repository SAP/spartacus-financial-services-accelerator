import { experimental } from '@angular-devkit/core';
import { italic, red } from '@angular-devkit/core/src/terminal';
import {
  chain,
  Rule,
  SchematicContext,
  SchematicsException,
  Tree,
} from '@angular-devkit/schematics';
import { getProjectStyleFile } from '@angular/cdk/schematics';
import { isImported } from '@schematics/angular/utility/ast-utils';
import { getAppModulePath } from '@schematics/angular/utility/ng-ast-utils';

import {
  addImport,
  getTsSourceFile,
  getProjectTargets,
  addToModuleImportsAndCommitChanges,
} from '@spartacus/schematics';

import { FS_STOREFRONT_MODULE, FSA_STOREFRONTLIB } from '../shared/constants';
import { parseCSV } from '../shared/utils/transform-utils';
import { getProjectFromWorkspace } from '../shared/utils/workspace-utils';
import { Schema as FsOptions } from './schema';

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
    if (!isImported(moduleSource, FS_STOREFRONT_MODULE, FSA_STOREFRONTLIB)) {
      // add imports
      addImport(host, modulePath, FS_STOREFRONT_MODULE, FSA_STOREFRONTLIB);

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
    const insertion = `\n@import '~@fsa/fsastorefrontstyles/index';\n`;

    if (htmlContent.includes(insertion)) {
      return;
    }

    const recorder = host.beginUpdate(styleFilePath);

    recorder.insertLeft(htmlContent.length, insertion);
    host.commitUpdate(recorder);
  };
}

export function addFsa(options: FsOptions): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const project = getProjectFromWorkspace(tree, options);

    return chain([updateAppModule(options), installStyles(project)])(
      tree,
      context
    );
  };
}
