import {
  // apply,
  // MergeStrategy,
  // mergeWith,
  // move,
  Rule,
  SchematicContext,
  SchematicsException,
  Tree,
  // url,
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
    // const defaultProjectPath = `${project.sourceRoot}/${
    //   project.projectType === 'application' ? 'app' : 'lib'
    // }`;
    // const rawFontSourceDir = '/node_modules/@spartacus/fsa-styles/fonts';
    const rawFontCopiesDir = tree.getDir(`${project.sourceRoot}/assets/fonts`);
    // const fontCopies = apply(url(rawFontCopiesDir), [move('/node_modules/@spartacus/fsa-styles/fonts')]);
    // `${rawFontCopiesDir}`)]);

    const results: string[] = [];
    tree.getDir('node_modules/@spartacus/fsa-styles/fonts').visit(filePath => {
      const file = filePath.split('/').slice(-1).toString();
      results.push(file);
    });
    const fs = require('fs');
    const parsedDir = JSON.parse(JSON.stringify(rawFontCopiesDir));
    const rootDir = parsedDir._tree._backend._root;
    // console.log(rawFontCopiesDir.path);
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
    // results.map(result => {
    //   const copyFonts = apply(url(`${result}`), [
    //     move(`${result}`, `${rawFontCopiesDir}`),
    //   ]);
    //   return mergeWith(copyFonts, MergeStrategy.Overwrite);
    // });
    return tree;
  };
}
