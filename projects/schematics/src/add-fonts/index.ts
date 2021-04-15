import {
  Rule,
  SchematicContext,
  SchematicsException,
  Tree,
} from '@angular-devkit/schematics';

export function addFonts(_options: any): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    // const fontDir = JSON.parse(rawFontCopiesDir.toString());
    const workspaceConfigBuffer = tree.read('angular.json');
    if (!workspaceConfigBuffer) {
      throw new SchematicsException('Not an Angular CLI workspace');
    }
    const workspace = JSON.parse(workspaceConfigBuffer.toString());
    const projectName = workspace.defaultProject;
    const project = workspace.projects[projectName];
    const rawFontCopiesDir = tree.getDir(`${project.sourceRoot}/assets/fonts`);
    const results: string[] = [];
    tree.getDir('node_modules/@spartacus/fsa-styles/fonts').visit(filePath => {
      const file = filePath.split('/').slice(-1).toString();
      results.push(file);
    });
    const fs = require('fs');
    const parsedDir = JSON.parse(JSON.stringify(rawFontCopiesDir));
    const rootDir = parsedDir._tree._backend._root;
    fs.mkdir(`${rootDir}${rawFontCopiesDir.path}`, (err: any) => {
      if (err) {
        throw err;
      }
    });
    results.forEach(result => {
      fs.copyFile(
        `${rootDir}/node_modules/@spartacus/fsa-styles/fonts/${result}`,
        `${rootDir}${rawFontCopiesDir.path}/${result}`,
        (err: any) => {
          if (err) {
            throw err;
          }
          console.log(`${result}`);
        }
      );
    });
    return tree;
  };
}
