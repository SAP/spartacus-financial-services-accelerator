import { experimental, JsonParseMode, parseJson } from '@angular-devkit/core';
import { SchematicsException, Tree } from '@angular-devkit/schematics';
import { FSSchema as FsOptions } from '../../add-fsa/schema';

const DEFAULT_POSSIBLE_PROJECT_FILES = ['/angular.json', '/.angular.json'];

export function getWorkspace(
  host: Tree,
  files = DEFAULT_POSSIBLE_PROJECT_FILES
): { path: string; workspace: experimental.workspace.WorkspaceSchema } {
  const angularJson = getAngularJsonFile(host, files);
  const path = files.filter(filePath => host.exists(filePath))[0];

  return {
    path,
    workspace: angularJson,
  };
}

function getAngularJsonFile(
  tree: Tree,
  possibleProjectFiles = DEFAULT_POSSIBLE_PROJECT_FILES
): experimental.workspace.WorkspaceSchema {
  const path = possibleProjectFiles.filter(filePath =>
    tree.exists(filePath)
  )[0];
  if (!path) {
    throw new SchematicsException(`Could not find Angular`);
  }

  const configBuffer = tree.read(path);
  if (configBuffer === null) {
    throw new SchematicsException(`Could not find (${path})`);
  }

  const angularJsonContent = configBuffer.toString();
  return (parseJson(
    angularJsonContent,
    JsonParseMode.Loose
  ) as unknown) as experimental.workspace.WorkspaceSchema;
}

export function getProjectFromWorkspace(
  tree: Tree,
  options: FsOptions,
  files = DEFAULT_POSSIBLE_PROJECT_FILES
): experimental.workspace.WorkspaceProject {
  const { workspace } = getWorkspace(tree, files);

  if (!options.project) {
    throw new SchematicsException('Option "project" is required.');
  }

  const project = workspace.projects[options.project];
  if (!project) {
    throw new SchematicsException(`Project is not defined in this workspace.`);
  }

  if (project.projectType !== 'application') {
    throw new SchematicsException(
      `Spartacus requires a project type of "application".`
    );
  }

  return project;
}
