import {
  chain,
  externalSchematic,
  noop,
  Rule,
  schematic,
  SchematicContext,
  Tree,
} from '@angular-devkit/schematics';
import { ANGULAR_LOCALIZE } from '../shared/constants';

export default function (options: any): Rule {
  return (host: Tree, context: SchematicContext) => {
    const enablePWA = options.pwa;
    const enableSSR = options.ssr;
    return chain([
      schematic('add-spartacus', options),
      enablePWA && JSON.parse(options.pwa)
        ? schematic('add-pwa', options)
        : noop(),
      enableSSR && JSON.parse(options.ssr)
        ? schematic('add-ssr', options)
        : noop(),
      externalSchematic(ANGULAR_LOCALIZE, 'ng-add', options),
    ])(host, context);
  };
}
