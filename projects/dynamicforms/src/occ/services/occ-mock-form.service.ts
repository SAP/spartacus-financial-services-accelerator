import { Injectable } from '@angular/core';
import { default as autoOptions } from './auto-options';
import { FieldOptionItem } from '../../core';

@Injectable()
export class OccMockFormService {
  setInitialFormControlValues(nodes: any): any {
    let result = null;
    const optionsArray: FieldOptionItem[] = [];
    if (nodes.length === 1) {
      result = autoOptions[nodes[0]];
    }
    if (result) {
      result.forEach(node => {
        optionsArray.push({
          name: node.code,
          label: node.code,
        });
      });
    }
    return optionsArray;
  }
  getDropdownValues(nodesForParsing: any, val: string): any {
    let result = new Array(autoOptions);
    const optionsArray: FieldOptionItem[] = [];
    if (nodesForParsing.length > 1) {
      for (let i = 0; i < nodesForParsing.length; i += 1) {
        const extractedResults = this.getNodes(result, i, val, nodesForParsing);
        if (nodesForParsing.length - 1 === i) {
          extractedResults.forEach(resultElement => {
            optionsArray.push({
              name: resultElement.code ? resultElement.code : resultElement,
              label: resultElement.code ? resultElement.code : resultElement,
            });
          });
        } else {
          result = extractedResults;
        }
      }
      return optionsArray;
    }
  }

  private getNodes(
    result: any,
    i: number,
    value: string,
    nodesForParsing: any
  ): any {
    const values = [];
    function pushElements(obj) {
      if (obj.length) {
        obj.forEach(el => {
          values.push(el);
        });
      } else {
        values.push(obj);
      }
    }
    for (let j = 0; j < result.length; j += 1) {
      const obj = result[j][nodesForParsing[i]];
      if (obj && result[j].code === value) {
        pushElements(obj);
        break;
      } else if (nodesForParsing.length - 1 > i && obj) {
        pushElements(obj);
      }
    }
    return values;
  }
}
