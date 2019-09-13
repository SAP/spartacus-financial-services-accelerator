import { Injectable } from '@angular/core';
// @ts-ignore
import autoOptions from '../../checkout/assets/components/forms/configurations/auto-options.json';


@Injectable()
export class MockFormService {
  setInitialFormControlValues(array: any, nodes: any) {
    let result = null;
    if (nodes.length === 1) {
      result = autoOptions[nodes[0]];
    }
    if (result) {
      result.forEach((node) => {
        array.push(node.code);
      });
    }
  }
  getDropdownValues(array: any, nodesForParsing: any, val: string) {
    let result = autoOptions;
    if (nodesForParsing.length > 1) {
        for (let i = 0; i < nodesForParsing.length; i += 1) {
          if (result.length) {
            const extractedResults = this.getNodes(result, i, val, nodesForParsing);
            if (nodesForParsing.length - 1 === i) {
              extractedResults.forEach((resultElement) => {
                array.push(resultElement.code ? resultElement.code : resultElement);
              });
            } else {
              result = extractedResults;
            }
          } else {
            result = result[nodesForParsing[i]];
          }
        }
    }
  }

  private getNodes(result: any, i: number, value: string, nodesForParsing: any): any {
    const values = [];
    function pushElements(obj) {
      if (obj.length) {
        obj.forEach((el) => {
          values.push(el);
        });
      } else {
        values.push(obj);
      }
    }
    for (let j = 0; j < result.length; j += 1) {
      const obj = (result[j])[nodesForParsing[i]];
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
