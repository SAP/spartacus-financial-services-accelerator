import {
  chain,
  externalSchematic,
  Rule,
  schematic,
  SchematicContext,
  Tree,
} from '@angular-devkit/schematics';
import { ANGULAR_LOCALIZE } from '@spartacus/schematics';

export default function (options: any): Rule {
  return (host: Tree, context: SchematicContext) => {
    return chain([
      schematic('add-fsa', options),
      externalSchematic(ANGULAR_LOCALIZE, 'ng-add', options),
    ])(host, context);
  };
}
