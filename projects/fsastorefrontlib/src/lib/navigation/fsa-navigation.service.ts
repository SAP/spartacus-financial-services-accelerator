import { Injectable } from '@angular/core';
import { NavigationService } from 'projects/storefrontlib/src/lib/cms-lib/navigation/navigation.service';

@Injectable()
export class FsaNavigationService extends NavigationService {

    public createNode(nodeData, items) {
        console.log('radi custom servis.');
        const node = super.createNode(nodeData, items);
        if (nodeData.entries && nodeData.entries.length > 0) {
            const entry = nodeData.entries[0];
            const item = items[`${entry.itemId}_${entry.itemSuperType}`];
            node['styleAttributes'] = item.styleAttributes;
        }
        return node;
    }

    public funkcija() {
        console.log('poyy');
    }
}
